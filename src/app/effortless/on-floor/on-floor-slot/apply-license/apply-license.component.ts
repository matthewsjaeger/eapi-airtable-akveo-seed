import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbToastrService, NbMenuService, NbDialogService } from '@nebular/theme';
import { AddLicenseBarcodeComponent } from './add-license-barcode/add-license-barcode.component';

@Component({
  selector: 'ngx-apply-license',
  templateUrl: './apply-license.component.html',
  styleUrls: ['./apply-license.component.scss']
})
export class ApplyLicenseComponent extends EffortlessComponentBase implements OnInit {
  slot: any = {};
  sid: any;

  checklist: any = {
    Manufacturer: '', SerialNumber: '', ModelNumber: '', LabCertification: '', CommissionLicense: ''
  };

  tempChecklist: any = {
    Manufacturer: {}, SerialNumber: {}, ModelNumber: {}, LabCertification: {}, CommissionLicense: {}
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
    this.checklistMetadata.PercentComplete = 50;
    if (this.checklist.Manufacturer) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.SerialNumber) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.ModelNumber) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.LabCertification) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.CommissionLicense) this.checklistMetadata.PercentComplete += 10;


    this.checklistMetadata.Status = (this.checklistMetadata.PercentComplete == 100) ? 4 : 1;
    this.checklistMetadata.ComplianceStatus = (this.checklist.Manufacturer == 'Fail' || this.checklist.SerialNumber == 'Fail' || this.checklist.ModelNumber == 'Fail'
      || this.checklist.LabCertification == 'Fail' || this.checklist.CommissionLicense == 'Fail') ? 1 :
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
    payload.Flag = "Step1";
    this.gds.smqSlotRepairAdmin.ApplyLicense(payload).then(resp => {
      if (resp.ErrorMessage) {
        self.toastr.danger(resp.ErrorMessage);
      } else {
        self.getBarcode();
      }
    });
  }

  cancel() {
    let self = this;
    this.router.navigateByUrl('effortless/on-floor-slot/' + self.sid);
  }

  getBarcode() {
    let self = this;
    this.dialogService.open(AddLicenseBarcodeComponent, {
      closeOnBackdropClick: false,
      context: {
        'slot': self.slot
      }
    }).onClose.subscribe(resp => self.finishBarcode(resp, self));
  }

  finishBarcode(resp, self) {
    this.router.navigateByUrl('effortless/on-floor-slot/' + self.sid);
  }

}
