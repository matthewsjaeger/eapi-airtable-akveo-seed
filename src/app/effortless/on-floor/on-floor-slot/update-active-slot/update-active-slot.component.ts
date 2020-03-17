import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-update-active-slot',
  templateUrl: './update-active-slot.component.html',
  styleUrls: ['./update-active-slot.component.scss']
})
export class UpdateActiveSlotComponent extends EffortlessComponentBase implements OnInit {
  sid: any;
  slot: any;

  

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }));

    
  }
  

  ngOnInit() {
    let self = this
      let payload = self.gds.createPayload();
      payload.Slot = {};
      payload.Slot.SlotId = self.sid;
      console.error(self.gds);
      self.gds.smqUser.GetSlotViewDetails(payload).then(function (reply) {
        self.slot = reply.SlotView;
        console.error(self.slot)
      });
  }

}
