import { Component, OnInit, Input } from '@angular/core';
import { EffortlessComponentBase } from '../../../../efforless-base-component';
import { GDS } from '../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { RemovalTypeComponent } from '../../../../slot-projects/slot-project/removal-type/removal-type.component';

@Component({
  selector: 'ngx-add-license-barcode',
  templateUrl: './add-license-barcode.component.html',
  styleUrls: ['./add-license-barcode.component.scss']
})
export class AddLicenseBarcodeComponent extends EffortlessComponentBase implements OnInit {
  @Input() slot: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<RemovalTypeComponent>, private dialogService: NbDialogService, public toastr: NbToastrService) {
    super(gds, data, menuService)
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    if (!this.slot.BarcodeData) {
      this.toastr.danger("Barcode cannot be empty.");
      return;
    }
    let self = this;
    let payload = this.gds.createPayload();
    payload.SlotView = this.slot;
    payload.Flag = "Step2";
    this.gds.smqSlotRepairAdmin.ApplyLicense(payload).then(resp => {
      if (resp.ErrorMessage) {
        self.toastr.danger(resp.ErrorMessage);
      } else {
        self.toastr.success("License applied successfully.");
        this.dialogRef.close(true);
      }
    });
  }

}
