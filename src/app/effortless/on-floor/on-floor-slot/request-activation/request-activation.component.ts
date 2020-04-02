import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { GDS } from '../../../services/gds.service';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-request-activation',
  templateUrl: './request-activation.component.html',
  styleUrls: ['./request-activation.component.scss']
})
export class RequestActivationComponent extends EffortlessComponentBase implements OnInit {

  checklist: any = {
    ScheduledChanges: '' 
    // LicenseNumber: '', SerialNumber: '', MetersRecorded: '', ZeroMeters: '',
    // SlotLine: '', MasterChip: '', NewAddress: '', GameName: '', ChipOptions: '', MachineOptions: '',
    // RealTime: '', SiteId: '', Cl: '', Glass: '', MachinePlaques: '', ButtonLegends: '', Awards: '',
    // CommunicationType: '', Inserts: '', HandPay: '', Candle: '', TopAward: '', DemoTicket: '', CoinCredit: '',
    // ConnectSlot: '', CoinTest: '', BillTest: '', BillDoor: '', DoorDrop: '', MainDoor: '', AuxDoor: '', GlassMatch: '',
    // Reboot: '', TITOTest: '', TouchScreen:'', CardReader: '', ProgressiveIncrement: '', IncrementValue:'', 
    // BaseValue: '', LogicCage: '', SignedOff: ''
    };

  tempChecklist: any = {
    ScheduledChanges: {}, 
    // LicenseNumber: {}, SerialNumber: {}, MetersRecorded: {}, ZeroMeters: {},
    // SlotLine: {}, MasterChip: {}, NewAddress: {}, GameName: {}, ChipOptions: {}, MachineOptions: {},
    // RealTime: {}, SiteId: {}, Cl: {}, Glass: {}, MachinePlaques: {}, ButtonLegends: {}, Awards:{},
    // CommunicationType: {}, Inserts: {}, HandPay: {}, Candle: {}, TopAward: {}, DemoTicket: {}, CoinCredit: {},
    // ConnectSlot: {}, CoinTest: {}, BillTest: {}, BillDoor: {}, DoorDrop: {}, MainDoor: {}, AuxDoor: {}, GlassMatch: {},
    // Reboot: {}, TITOTest: {}, TouchScreen: {}, CardReader: {}, ProgressiveIncrement: {}, IncrementValue:{}, 
    // BaseValue: {}, LogicCage: {}, SignedOff: {},
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
    this.checklistMetadata.PercentComplete = 16;
    if (this.checklist.ScheduledChanges) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.LicenseNumber) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.SerialNumber) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.MetersRecorded) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.ZeroMeters) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.SlotLine) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.MasterChip) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.NewAddress) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.GameName) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.ChipOptions) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.MachineOptions) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.RealTime) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.SiteId) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.Cl) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.Glass) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.MachinePlaques) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.ButtonLegends) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.Awards) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.CommunicationType) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.Inserts) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.HandPay) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.Candle) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.TopAward) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.DemoTicket) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.CoinCredit) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.ConnectSlot) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.CoinTest) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.BillTest) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.BillDoor) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.DoorDrop) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.MainDoor) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.AuxDoor) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.GlassMatch) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.Reboot) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.TITOTest) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.TouchScreen) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.CardReader) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.ProgressiveIncrement) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.IncrementValue) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.BaseValue) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.LogicCage) this.checklistMetadata.PercentComplete += 2;
    // if (this.checklist.SignedOff) this.checklistMetadata.PercentComplete += 2;
    this.checklistMetadata.Status = (this.checklistMetadata.PercentComplete == 100) ? 4 : 1;
    this.checklistMetadata.ComplianceStatus = (this.checklist.ScheduledChanges == 'Fail') ? 1 : 
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
    this.gds.smqGamingAgent.RequestActivation(payload).then(resp => {
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
