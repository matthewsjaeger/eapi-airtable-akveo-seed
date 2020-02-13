import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { GDS } from '../../../services/gds.service';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-preventative-maintenance',
  templateUrl: './preventative-maintenance.component.html',
  styleUrls: ['./preventative-maintenance.component.scss']
})
export class PreventativeMaintenanceComponent extends EffortlessComponentBase implements OnInit {

  checklist: any = {
    Vaccum: '', BlowOut: '', TouchScreen: '', TestButton: '',
    Dba: '', Printer: '', Door: '', Comments: ''
  }

  tempChecklist: any = {
    Vaccum: {}, BlowOut: {}, TouchScreen: {}, TestButton: {},
    Dba: {}, Printer: {}, Door: {}, Comments: {}
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
    this.checklistMetadata.PercentComplete = 0;
    if (this.checklist.Vaccum) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.BlowOut) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.TouchScreen) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.TestButton) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.Dba) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.Printer) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.Door) this.checklistMetadata.PercentComplete += 10;
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

}
