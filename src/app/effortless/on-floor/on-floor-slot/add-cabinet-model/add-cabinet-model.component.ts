import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbToastrService, NbMenuService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-add-cabinet-model',
  templateUrl: './add-cabinet-model.component.html',
  styleUrls: ['./add-cabinet-model.component.scss']
})
export class AddCabinetModelComponent extends EffortlessComponentBase implements OnInit {
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

  finish() {
    let self = this;
    let payload = this.gds.createPayload();
    payload.SlotView = this.slot;
    this.gds.smqSlotRepairAdmin.AddCabinetModel(payload).then(resp => {
      if (resp.ErrorMessage) {
        self.toastr.danger(resp.ErrorMessage);
      } else {
        self.toastr.success("Slot Updated Successfully.");
        this.router.navigateByUrl('effortless/on-floor-slot/' + self.sid);
      }
    });
  }

  cancel() {
    let self = this;
    this.router.navigateByUrl('effortless/on-floor-slot/' + self.sid);
  }

}
