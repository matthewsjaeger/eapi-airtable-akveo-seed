import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { GDS } from '../../../services/gds.service';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-verify-twenty-fifty',
  templateUrl: './verify-twenty-fifty.component.html',
  styleUrls: ['./verify-twenty-fifty.component.scss']
})
export class VerifyTwentyFiftyComponent extends EffortlessComponentBase implements OnInit {

  checklist: any = {
    JackpotAmount: '', Book: '', SealIntact: '', RepairRepresentative: '',
    SecurityRepresentative: '', OperationsManager: '', CasinoManager: ''
  };

  tempChecklist: any = {
    JackpotAmount: {}, Book: {}, SealIntact: {}, RepairRepresentative: {},
    SecurityRepresentative: {}, OperationsManager: {}, CasinoManager: {}
  };

  sid: any = "";
  people: any = [{}];
  checklistMetadata: any = {};

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute ) { 
    super (gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];   
    }));

  }

  ngOnInit() {

    let payload = this.gds.createPayload();
    this.gds.smqUser.GetAllPeople(payload).then(resp => {
      if (!resp.ErrorMessage) {
        this.people = resp.People;
        this.people.forEach(person => {
          person.FullName = person.LastName + ', ' + person.FirstName;
        });
      }
    })
  }

  updatePercentComplete = function () {
    this.checklistMetadata.PercentComplete = 0;
    if (this.checklist.JackpotAmount) this.checklistMetadata.PercentComplete += 40;
    if (this.checklist.Book) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.SealIntact) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.RepairRepresentative) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.SecurityRepresentative) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.OperationsManager) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.CasinoManager) this.checklistMetadata.PercentComplete += 10;
  
    this.checklistMetadata.Status = (this.checklistMetadata.PercentComplete == 100) ? 4 : 1;
    this.checklistMetadata.ComplianceStatus = (!this.checklist.RepairRepresentative || !this.checklist.SecurityRepresentative
      || !this.checklist.OperationsManager || !this.checklist.CasinoManager || this.checklist.Book == 'No' || 
      this.checklist.SealIntact == 'No') ? 1 : (this.checklistMetadata.PercentComplete == 100) ? 0 : 2;
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
    this.gds.smqGamingAgent.JPVerify20K(payload).then(resp => {
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