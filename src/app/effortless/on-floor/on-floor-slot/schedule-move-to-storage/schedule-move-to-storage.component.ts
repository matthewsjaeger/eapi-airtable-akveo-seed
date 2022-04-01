import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogService, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-schedule-move-to-storage',
  templateUrl: './schedule-move-to-storage.component.html',
  styleUrls: ['./schedule-move-to-storage.component.scss']
})
export class ScheduleMoveToStorageComponent extends EffortlessComponentBase implements OnInit {
  error: any = "";
  scheduledDate;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint,
    protected menuService: NbMenuService, public route: ActivatedRoute, private dialogService: NbDialogService,
    public toastr: NbToastrService) {
    super(gds, data, menuService)
  }

  ngOnInit() {
    if (this.gds.slotList.length < 1) {
      this.cancel();
    }
  }

  cancel() {
    this.error = null;
    this.router.navigateByUrl('effortless/multi-select');
  }

  confirm() {
    let self = this;
    let payload = self.gds.createPayload();
    payload.SlotViews = this.gds.slotList;
    payload.Scheduled = this.scheduledDate;
    this.gds.smqSlotRepairAdmin.ScheduleMoveToStorage(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      } else {
        self.cancel();
      }
    });
  }

}
