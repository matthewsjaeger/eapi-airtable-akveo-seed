import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { GDS } from '../../../../../services/gds.service';
import { EffortlessComponentBase } from '../../../../../efforless-base-component';
import { DataEndpoint } from '../../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-mlc-checklist',
  templateUrl: './mlc-checklist.component.html',
  styleUrls: ['./mlc-checklist.component.scss']
})
export class MlcChecklistComponent extends EffortlessComponentBase implements OnInit {

  checklist: any = {
    SecurityOfficer: '', ScheduledChanges: '', 
  }

  tempChecklist: any = {
    SecurityOfficer: {}, ScheduledChanges: {}, 
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
    if (this.gds.stageMngr.stage != 'checklist') {
      this.cancel();
    }
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
    if (this.checklist.SecurityOfficer) this.checklistMetadata.PercentComplete += 50;
    if (this.checklist.ScheduledChanges) this.checklistMetadata.PercentComplete += 50;
  
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
    let payload = this.gds.editSealPayload;
    payload.SlotView = { SlotId: this.sid, Checklist: this.checklist, ChecklistMetadata: this.checklistMetadata };
    this.gds.completeSlotConversionPayload = payload;
    this.gds.editSealPayload = {};
    this.gds.stageMngr.stage = 'summary';
    this.router.navigateByUrl('effortless/mlc-conversion/' + this.sid);
    //this.gds.smqGamingAgent.CompleteConversionFloorAdv(payload).then(resp => {
    //  if (!resp.ErrorMessage) {
    //    this.router.navigateByUrl('effortless/on-floor-slot/' + self.sid);
    //  }
    //});
  }



  cancel(){
    let self = this;
    this.gds.stageMngr = { slot: '', operation: '', stage: '' };
    this.gds.editSealPayload = {};
    this.router.navigateByUrl('effortless/on-floor-slot/' + self.sid); 
  }


}
