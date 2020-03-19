import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDatepicker } from '@nebular/theme';

@Component({
  selector: 'ngx-update-active-slot',
  templateUrl: './update-active-slot.component.html',
  styleUrls: ['./update-active-slot.component.scss']
})
export class UpdateActiveSlotComponent extends EffortlessComponentBase implements OnInit {
  sid: any;
  slot: any;
  new: any = {
    DOM: '', LastAudited: ''
  }
  gameName: any;
  progressiveDef: any;
  def: any;
  game: any;

  

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

  addGame(){
    
    let payload = this.gds.createPayload();
    payload.SearchTerm = this.gameName;
    this.gds.smqUser.SearchGameName(payload).then(reply=>{

      this.game = reply.SlotGameDefs;
      console.error(this.game)
      
  
    })
  }

  addDef(){
    
    let payload = this.gds.createPayload();
    payload.SearchTerm = this.progressiveDef;
    this.gds.smqUser.SearchProgressiveDef(payload).then(reply=>{
      this.def = reply.ProgressiveDefs;
      console.error(this.def)
    })
  }

  finish(){
    let self = this;
    let payload = this.gds.createPayload();
    payload.SlotView = { SlotId: this.sid, Slot: this.slot};
    this.gds.smqSlotRepairAdmin.UpdateActiveSlot(payload).then(resp => {
      if (!resp.ErrorMessage) {
        this.router.navigateByUrl('effortless/on-floor-slot/' + this.sid);
      }
    });
  }

  cancel(){
    this.router.navigateByUrl('effortless/on-floor-slot/' + this.sid)
  }

}
