import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-cdi-conflicted',
  templateUrl: './cdi-conflicted.component.html',
  styleUrls: ['./cdi-conflicted.component.scss']
})
export class CdiConflictedComponent extends EffortlessComponentBase implements OnInit {
  scdsc: any = null;
  scdsi: any = null;
  scdsu: any = null;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, public toastr: NbToastrService) {
    super(gds, data, menuService)
  }

  ngOnInit() {
    let self = this;
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      self.reload();
    }));
  }

  reload() {
    let self = this;
    var payload = this.gds.createPayload();
    payload.Num = 1;
    this.gds.smqATR.GetConflictedComponents(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      }
      console.error("GetConflictedComponents", reply);
      self.scdsc = reply.SlotComponentDefs;
    });
    var payload2 = this.gds.createPayload();
    payload2.Num = 2;
    this.gds.smqATR.GetConflictedComponents(payload2).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      }
      console.error("GetConflictedComponents", reply);
      self.scdsi = reply.SlotComponentDefs;
    });
    var payload3 = this.gds.createPayload();
    payload3.Num = 3;
    this.gds.smqATR.GetConflictedComponents(payload3).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      }
      console.error("GetConflictedComponents", reply);
      self.scdsu = reply.SlotComponentDefs;
    });
  }

}
