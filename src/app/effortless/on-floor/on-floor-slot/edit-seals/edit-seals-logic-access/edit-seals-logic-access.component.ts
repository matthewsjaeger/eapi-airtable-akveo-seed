import { Component, OnInit } from '@angular/core';
import { GDS } from '../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogService } from '@nebular/theme';
import { EffortlessComponentBase } from '../../../../efforless-base-component';

@Component({
  selector: 'ngx-edit-seals-logic-access',
  templateUrl: './edit-seals-logic-access.component.html',
  styleUrls: ['./edit-seals-logic-access.component.scss']
})
export class EditSealsLogicAccessComponent extends EffortlessComponentBase implements OnInit {

  sid: any;
  slot: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute) {
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

}
