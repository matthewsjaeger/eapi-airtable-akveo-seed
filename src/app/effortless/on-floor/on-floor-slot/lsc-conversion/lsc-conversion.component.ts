import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDatepicker, NbToastrService } from '@nebular/theme';
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
    this.getStage();
    if (this.stage == 'cancel') {
      this.cancel();
    } else if (this.stage == 'seals') {
      this.router.navigateByUrl('effortless/edit-seals/' + this.sid + '/lsc-conversion');
    } else if (this.stage == 'checklist') {
      this.router.navigateByUrl('effortless/lsc-checklist/' + this.sid);
    } else if (this.stage == 'summary') {
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

  getStage() {
    if (this.gds.stageMngr.slot != this.sid || this.gds.stageMngr.operation != 'lsc-conversion') {
      this.gds.stageMngr = { stage: 'cancel' };
    }
    this.stage = this.gds.stageMngr.stage;
  }

  finish() {
    let self = this;
    let payload = self.gds.createPayload();
    this.gds.completeSlotConversionPayload = Object.assign(payload, this.gds.completeSlotConversionPayload);
    this.gds.smqSlotRepairAdmin.CompleteConversionLSC(this.gds.completeSlotConversionPayload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      } else {
        self.cancel();
      }
    });
  }

  cancel() {
    this.gds.stageMngr = { slot: '', operation: '', stage: '' };
    this.error = null;
    this.router.navigateByUrl('effortless/on-floor-slot/' + this.sid); 
  }

}
