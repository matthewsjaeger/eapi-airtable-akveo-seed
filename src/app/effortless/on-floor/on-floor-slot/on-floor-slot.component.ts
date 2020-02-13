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
  search: any;
  slot: any = {};
  slots: any;
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
    payload.Slot = {};
    payload.Slot.SlotId = self.sid;
    console.error(self.gds);
    self.gds.smqATR.GetSlotDetails(payload).then(function (reply) {
      self.slot = reply.Slot;
    });
  }

  goBack(){
    this.router.navigateByUrl('')
  }

  emergencyDropInspection(){
    this.router.navigateByUrl('effortless/emergency-drop-inspection/' + this.sid);
  }

  jpVerifyTenTwenty(){
    this.router.navigateByUrl('effortless/verify-ten-twenty/' + this.sid)
  }

  mediaVerification(){
    this.router.navigateByUrl('effortless/media-verification/' + this.sid)
  }

  stackerFullRecord(){
    this.router.navigateByUrl('effortless/stacker-full-record/' + this.sid)
  }

  preventativeMaintenance(){
    this.router.navigateByUrl('effortless/preventative-maintenance')
  }

}
