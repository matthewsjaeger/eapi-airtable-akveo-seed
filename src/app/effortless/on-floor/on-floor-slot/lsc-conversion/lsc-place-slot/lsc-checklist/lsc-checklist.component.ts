import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { GDS } from '../../../../../services/gds.service';
import { EffortlessComponentBase } from '../../../../../efforless-base-component';
import { DataEndpoint } from '../../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-lsc-checklist',
  templateUrl: './lsc-checklist.component.html',
  styleUrls: ['./lsc-checklist.component.scss']
})
export class LscChecklistComponent extends EffortlessComponentBase implements OnInit {

  checklist: any = {
    SecurityOfficer: '', ScheduledChanges: '', BillTest: '', TicketTest: '', VerifyAmount: '', MeterTest: '', 
    CorrectDeficiencies: '', MealBook: ''
  }

  tempChecklist: any = {
    SecurityOfficer: {}, ScheduledChanges: {}, BillTest: {}, TicketTest: {}, VerifyAmount: {}, MeterTest: {}, 
    CorrectDeficiencies: {}, MealBook: {}
  }

  checked = false;
  sid: any;
  checklistMetadata: any = {};
  backgroundColor: any;
  security: any;
  securityPerson: any;
  



  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute ) { 
    super (gds, data, menuService) 

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];   
    }));

  }

  ngOnInit() {
  }

  addSecurity(){
    let payload = this.gds.createPayload();
    payload.SearchTerm = this.security
    this.gds.smqUser.GetPersonByBadgeNumber(payload).then(reply =>{
      this.securityPerson = reply.Person
      this.checklist.SecurityOfficer = this.securityPerson.FirstName + ' ' + this.securityPerson.LastName + ', ' + this.securityPerson.SecurityUserId;
      this.security = ''
    })
  } 

  deleteSecurity(){
   this.securityPerson = ''
  }

  updatePercentComplete = function () {
    this.checklistMetadata.PercentComplete = 0;
    if (this.checklist.SecurityOfficer) this.checklistMetadata.PercentComplete += 30;
    if (this.checklist.ScheduledChanges) this.checklistMetadataPercentComplete += 10;
    if (this.checklist.BillTest) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.TicketTest) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.VerifyAmount) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.MeterTest) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.CorrectDeficiencies) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.MealBook) this.checklistMetadata.PercentComplete += 10;
  
    this.checklistMetadata.Status = (this.checklistMetadata.PercentComplete == 100) ? 4 : 1;
    this.checklistMetadata.ComplianceStatus = (!this.checklist.SecurityOfficer)
     ? 1 : (this.checklistMetadata.PercentComplete == 100) ? 0 : 2;
  };

  applyToChecklist = function (question, answer) {
    for (let feAnswer in this.tempChecklist[question]) {
      if (feAnswer != answer) {
        this.tempChecklist[question][feAnswer] = false;
      }
    }
    if (this.tempChecklist[question][answer]) {
      let fixedAnswer = answer;
      if (answer == 'NA') {
        fixedAnswer = 'N/A';
      } else if (answer == 'NonCompliant') {
        fixedAnswer = 'Non-Compliant';
      }
      this.checklist[question] = fixedAnswer;
    } else {
      this.checklist[question] = '';
    }

    this.updatePercentComplete();
  }





  finish() {
    let self = this;
    this.updatePercentComplete();
    let payload = this.gds.createPayload();
    payload.SlotView = { SlotId: this.sid, Checklist: this.checklist, ChecklistMetadata: this.checklistMetadata };
    this.gds.smqGamingAgent.CompleteConversionFloorAdv(payload).then(resp => {
      if (!resp.ErrorMessage) {
        this.router.navigateByUrl('effortless/on-floor-slot/' + self.sid);
      }
    });
  }



  cancel(){
    let self = this;
    this.router.navigateByUrl('effortless/on-floor-slot/' + self.sid); 
  }


}
