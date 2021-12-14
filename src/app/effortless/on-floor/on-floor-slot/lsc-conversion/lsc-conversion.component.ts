import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDatepicker } from '@nebular/theme';
import { SlotProjectComponent } from '../../../slot-projects/slot-project/slot-project.component';

@Component({
  selector: 'ngx-lsc-conversion',
  templateUrl: './lsc-conversion.component.html',
  styleUrls: ['./lsc-conversion.component.scss']
})
export class LscConversionComponent extends EffortlessComponentBase implements OnInit {
  sid: any;
  slot: any;
  stage: any;
  conversion: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }));

 
    
  }
  ngOnInit() {
    let self = this;
    this.getStage();
    if (this.stage == 'seals') {
      this.router.navigateByUrl('effortless/edit-seals/' + this.sid + '/lsc-conversion');
    } else if (this.stage == 'checklist') {
      this.router.navigateByUrl('effortless/lsc-checklist/' + this.sid);
    } else if (this.stage == 'summary') {
      let payload = self.gds.createPayload();
      payload.Slot = {};
      payload.Slot.SlotId = self.sid;
      self.gds.smqUser.GetSlotViewDetails(payload).then(function (reply) {
        self.slot = reply.SlotView;
        self.conversion = reply.Conversion

        console.error(self.slot)
        console.error(self.conversion)
      });
    }
  }

  getStage() {
    if (this.gds.stageMngr.slot != this.sid || this.gds.stageMngr.operation != 'lsc-conversion' || this.gds.stageMngr.stage == 'seals') {
      this.gds.stageMngr = { slot: this.sid, operation: 'lsc-conversion', stage: 'seals' };
    }
    this.stage = this.gds.stageMngr.stage;
  }

  next(){
  }

  cancel() {
    this.gds.stageMngr = { slot: '', operation: '', stage: '' };
    this.router.navigateByUrl('effortless/on-floor-slot/' + this.sid); 
  }

}
