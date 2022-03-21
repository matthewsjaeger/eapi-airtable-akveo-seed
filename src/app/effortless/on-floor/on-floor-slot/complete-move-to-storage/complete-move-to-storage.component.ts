import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-complete-move-to-storage',
  templateUrl: './complete-move-to-storage.component.html',
  styleUrls: ['./complete-move-to-storage.component.scss']
})
export class CompleteMoveToStorageComponent extends EffortlessComponentBase implements OnInit {
  sid: any;
  slot: any;
  stage: any;
  conversion: any;
  asc: any;
  added: any = [];
  removed: any = [];
  error: string;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, public toastr: NbToastrService) {

    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }));
  }

  ngOnInit() {
    let self = this;
    let payload = self.gds.createPayload();
    payload.SlotView = {};
    payload.SlotView.SlotId = self.sid;
    self.gds.smqUser.GetConversionDetails(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.error = reply.ErrorMessage;
        return;
      }
      self.slot = reply.SlotView;
      self.conversion = reply.SlotView.Conversion
      self.asc = reply.ASC;
      reply.SlotComponentDefs.forEach(def => {
        if (def.BeingAdded == 1) {
          self.added.push(def);
        } else {
          self.removed.push(def);
        }
      });
    });
  }
}
