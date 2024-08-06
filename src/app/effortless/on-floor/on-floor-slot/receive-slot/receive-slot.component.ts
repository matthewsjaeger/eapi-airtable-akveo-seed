import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogService, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-receive-slot',
  templateUrl: './receive-slot.component.html',
  styleUrls: ['./receive-slot.component.scss']
})
export class ReceiveSlotComponent extends EffortlessComponentBase implements OnInit {
  search: any;
  slot: any = {};
  slots: any = {};
  sid: any;
  slotView: any;
  avaliableActions: any = '';
  Active: any;

  checklist: any = {
    Manufacturer: '', SerialNumber: '', CabinetModel: ''
  };

  tempChecklist: any = {
    Manufacturer: {}, SerialNumber: {}, CabinetModel: {}
  };

  checklistMetadata: any = {};

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, public toastr: NbToastrService,
    protected menuService: NbMenuService, public route: ActivatedRoute, private dialogService: NbDialogService) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }));


  }

  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      let self = this
      let payload = self.gds.createPayload();
      payload.Slot = {};
      payload.Slot.SlotId = self.sid;
      console.error(self.gds);
      self.gds.smqUser.GetSlotViewDetails(payload).then(function (reply) {
        self.slot = reply.SlotView;
      });
    }));
  }

  updatePercentComplete = function () {
    this.checklistMetadata.PercentComplete = 0;
    if (this.checklist.Manufacturer) this.checklistMetadata.PercentComplete += 80;
    if (this.checklist.SerialNumber) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.CabinetModel) this.checklistMetadata.PercentComplete += 10;

    this.checklistMetadata.Status = (this.checklistMetadata.PercentComplete == 100) ? 4 : 1;
    this.checklistMetadata.ComplianceStatus = (this.checklist.Manufacturer == 'No' || this.checklist.SerialNumber == 'No' || this.checklist.CabinetModel == 'No') ? 1 :
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
    payload.SlotView = this.slot;
    payload.SlotView.Checklist = this.checklist;
    payload.SlotView.ChecklistMetadata = this.checklistMetadata;
    this.gds.smqSlotRepairAdmin.ReceivePurchasedSlot(payload).then(resp => {
      if (resp.ErrorMessage) {
        this.toastr.danger(resp.ErrorMessage);
      } else {
        this.router.navigateByUrl('effortless/on-floor-slot/' + self.sid);
      }
    });
  }

  cancel() {
    let self = this;
    this.router.navigateByUrl('effortless/on-floor-slot/' + self.sid);
  }

}
