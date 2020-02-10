import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { GDS } from '../../services/gds.service';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-on-floor-slot',
  templateUrl: './on-floor-slot.component.html',
  styleUrls: ['./on-floor-slot.component.scss']
})
export class OnFloorSlotComponent extends EffortlessComponentBase implements OnInit {
  Slot: any;
  search: any;
  slot: any;
  SlotId: any = '';
  sid: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute ) { 
    super (gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];   
    }));


  }

  ngOnInit() {
    let self = this
    let payload = self.gds.createPayload();
    payload.slot = {};
    payload.slot = self.sid;
    console.error(self.gds);
    self.gds.smqATR.GetSlotDetails(payload).then(function (reply) {
      self.slot = reply.Slot.SlotId;
    });
  }

  emergencyDropInspection(){
    this.router.navigateByUrl('effortless/emergency-drop-inspection')
  }

}
