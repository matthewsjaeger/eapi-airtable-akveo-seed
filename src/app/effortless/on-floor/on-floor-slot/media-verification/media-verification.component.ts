import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { GDS } from '../../../services/gds.service';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-media-verification',
  templateUrl: './media-verification.component.html',
  styleUrls: ['./media-verification.component.scss']
})
export class MediaVerificationComponent extends EffortlessComponentBase implements OnInit {

  checklist: any = {
    Verification: '',PaybackPercentage: '', ProgramNumber: '', MaxBet: '', MaxCredit: '',
    Check: '', TicketLimit: '', Signature: '', MediaSignature: ''
  };

  tempChecklist: any = {
    Verification: {}, PaybackPercentage: {}, ProgramNumber: {}, MaxBet: {}, MaxCredit: {},
    Check: {}, TicketLimit: {}, Signature: {}, MediaSignature: {}
  };

  checklistMetadata: any = {};
  sid: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
     public route: ActivatedRoute ) { 
    super (gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];   
    }));

  }

  ngOnInit() {
  }

  updatePercentComplete = function () {
    this.checklistMetadata.PercentComplete = 0;
    if (this.checklist.Verification) this.checklistMetadata.PercentComplete += 20;
    if (this.checklist.PaybackPercentage) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.ProgramNumber) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.MaxBet) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.MaxCredit) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.Check) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.TicketLimit) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.Signature) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.MediaSignature) this.checklistMetadata.PercentComplete += 10;
    this.checklistMetadata.Status = (this.checklistMetadata.PercentComplete == 100) ? 4 : 1;
    this.checklistMetadata.ComplianceStatus = (!this.checklist.Verification || !this.checklist.MediaSignature) ? 1 : 
    (this.checklistMetadata.PercentComplete == 100) ? 0 : 2;
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
    this.gds.smqGamingAgent.MediaVerification(payload).then(resp => {
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
