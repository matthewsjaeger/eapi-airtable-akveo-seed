import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDatepicker } from '@nebular/theme';
import { SlotProjectComponent } from '../../../slot-projects/slot-project/slot-project.component';

@Component({
  selector: 'ngx-mlc-conversion',
  templateUrl: './mlc-conversion.component.html',
  styleUrls: ['./mlc-conversion.component.scss']
})
export class MlcConversionComponent extends EffortlessComponentBase implements OnInit {
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
      self.gds.smqUser.GetSlotViewDetails(payload).then(function (reply) {
        self.slot = reply.SlotView;
        
        
        console.error(self.slot)
      });
      
  }

  next(){
    this.router.navigateByUrl('effortless/mlc-place-slot/' + this.sid)
  }

  cancel() {

  }

}
