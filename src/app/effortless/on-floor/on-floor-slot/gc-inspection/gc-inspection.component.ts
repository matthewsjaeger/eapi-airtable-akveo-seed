import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { GDS } from '../../../services/gds.service';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-gc-inspection',
  templateUrl: './gc-inspection.component.html',
  styleUrls: ['./gc-inspection.component.scss']
})
export class GcInspectionComponent extends EffortlessComponentBase implements OnInit {

  checklist: any = {
    InspectionReason: '', MachineIdentification: '', ProgramMatch: '', SignaturesVerified: '', SettingsVerified: '',
    MachineYield: '', LimitsAccurate: '', Progressive: '', CurrencyMeters: '', DoorMeters: '', TicketInformation: '',
    MachineCompliant: '', Comments: ''
  }

  tempChecklist: any = {
    InspectionReason: {}, MachineIdentification: {}, ProgramMatch: {}, SignaturesVerified: {}, SettingsVerified: {},
    MachineYield: {}, LimitsAccurate: {}, Progressive: {}, CurrencyMeters: {}, DoorMeters: {}, TicketInformation: {},
    MachineCompliant: {}, Comments: {}
  }

  sid:any;
  checklistMetadata: any = {};

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute ) { 
    super (gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];   
    }));

  }

  ngOnInit() {
  }

  updatePercentComplete = function () {
    this.checklistMetadata.PercentComplete = 35;
    if (this.checklist.InspectionReason) this.checklistMetadata.PercentComplete += 5;
    if (this.checklist.MachineCompliant) this.checklistMetadata.PercentComplete += 5
    if (this.checklist.ProgramMatch) this.checklistMetadata.PercentComplete += 5;
    if (this.checklist.SignaturesVerified) this.checklistMetadata.PercentComplete += 5;
    if (this.checklist.SettingsVerified) this.checklistMetadata.PercentComplete += 5;
    if (this.checklist.MachineYield) this.checklistMetadata.PercentComplete += 5;
    if (this.checklist.LimitsAccurate) this.checklistMetadata.PercentComplete += 5;
    if (this.checklist.Progressive) this.checklistMetadata.PercentComplete += 5;
    if (this.checklist.CurrencyMeters) this.checklistMetadata.PercentComplete += 5;
    if (this.checklist.DoorMeters) this.checklistMetadata.PercentComplete += 5;
    if (this.checklist.TicketInformation) this.checklistMetadata.PercentComplete += 5;
    if (this.checklist.MachineCompliant) this.checklistMetadata.PercentComplete += 5;
    if (this.checklist.Comments) this.checklistMetadata.PercentComplete += 5;
    this.checklistMetadata.Status = (this.checklistMetadata.PercentComplete == 100) ? 4 : 1;
    this.checklistMetadata.ComplianceStatus = (!this.checklist.InspectionReason || this.checklist.MachineCompliant == "Fail")
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
    console.error(this.sid);
    payload.SlotView = { SlotId: this.sid, Checklist: this.checklist, ChecklistMetadata: this.checklistMetadata };
    this.gds.smqGamingAgent.GCInspection(payload).then(resp => {
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
