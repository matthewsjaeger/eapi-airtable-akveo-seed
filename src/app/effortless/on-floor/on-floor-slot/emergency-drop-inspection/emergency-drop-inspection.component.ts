import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { GDS } from '../../../services/gds.service';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent, NbCheckboxComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-emergency-drop-inspection',
  templateUrl: './emergency-drop-inspection.component.html',
  styleUrls: ['./emergency-drop-inspection.component.scss']
})
export class EmergencyDropInspectionComponent extends EffortlessComponentBase implements OnInit {
  checklist: any = {
    NotifiedByPhone: '', EmergencyDropAuthorized: '', HardcountPersonnel: '', SecurityPersonnel: '',
    SlotPersonnel: '', ApprovedProcedureFollowed: '', FundsSecured: '', ProceduresFollowed: '',
    EmergencyDropCompliant: '', Comments: ''
  };
  tempChecklist: any = {
    NotifiedByPhone: {}, EmergencyDropAuthorized: {}, HardcountPersonnel: {}, SecurityPersonnel: {},
    SlotPersonnel: {}, ApprovedProcedureFollowed: {}, FundsSecured: {}, ProceduresFollowed: {},
    EmergencyDropCompliant: {}, Comments: {}
  };
  checklistMetadata: any = {};
  people: any = [{}];
  sid: any = "";
  constructor (public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute ) { 
    super(gds, data, menuService)
  
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
    if (this.checklist.NotifiedByPhone) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.EmergencyDropAuthorized) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.HardcountPersonnel) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.SecurityPersonnel) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.SlotPersonnel) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.ApprovedProcedureFollowed) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.FundsSecured) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.ProceduresFollowed) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.EmergencyDropCompliant) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.Comments) this.checklistMetadata.PercentComplete += 10;
    this.checklistMetadata.Status = (this.checklistMetadata.PercentComplete == 100) ? 4 : 1;
    this.checklistMetadata.ComplianceStatus = (!this.checklist.HardcountPersonnel || !this.checklist.SecurityPersonnel
      || !this.checklist.SlotPersonnel) ? 1 : (this.checklistMetadata.PercentComplete == 100) ? 0 : 2;
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
    let payload = this.gds.createPayload();
    payload.Checklist = this.checklist;
    payload.ChecklistMetadata = this.checklistMetadata;
    payload.Slot = { SlotId: this.sid };
    this.gds.smqGamingAgent.EmergencyDropInspection(payload).then(resp => {
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
