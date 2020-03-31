import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDatepicker } from '@nebular/theme';
import { SlotProjectComponent } from '../../../slot-projects/slot-project/slot-project.component';

@Component({
  selector: 'ngx-update-active-slot',
  templateUrl: './update-active-slot.component.html',
  styleUrls: ['./update-active-slot.component.scss']
})
export class UpdateActiveSlotComponent extends EffortlessComponentBase implements OnInit {
  sid: any;
  slot: any;
  

 
  
   

  showGame = false;
  showDef = false;

  gameName: any;
  progressiveDef: any;
  defs: any = [{}];
  games: any = [{}];

  

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
        self.slot.Conversion = {
          Zone: self.slot.Zone,
          Address: self.slot.Address,
          SystemAddress: self.slot.SystemAddress,
          DisplayLocation: self.slot.DisplayLocation,
          SlotLocation: self.slot.SlotLocation,
          GameName: self.slot.GameName,
          ProgressiveDef: self.slot.ProgressiveDef,
          SlotNumber: self.slot.SlotNumber,
          GameChip: self.slot.GameChip,
          GameType: self.slot.GameType,
          TITO: self.slot.TITO,
          Bill: self.slot.Bill,
          Coin: self.slot.Coin,
          Tokenized: self.slot.Tokenized,
          EFTEnabled: self.slot.EFTEnabled,
          DOM: self.slot.DOM,
          LastAudited: self.slot.LastAudited,
          Version: self.slot.Version,
          CabinetModel: self.slot.CabinetModel,
          CabinetStyle: self.slot.CabinetStyle,
          CabinetColor: self.slot.CabinetColor,
          DBAType: self.slot.DBAType,
          PrinterType: self.slot.PrinterType,
          CoinComparator: self.slot.CoinComparator,
          DateOfDelivery: self.slot.DateOfDelivery,
          Notes: self.slot.Notes,
          HSNEnabled: self.slot.HSNEnabled,
          LinkNumber: self.slot.LinkNumber,
          DispositionApprovalDate: self.slot.DispositionApprovalDate,
          DispositionApprovalNumber: self.slot.DispositionApprovalNumber
        }
        
        console.error(self.slot)
      });
      
  }

  addGame(){
    
    let payload = this.gds.createPayload();
    payload.SearchTerm = this.gameName;
    this.gds.smqUser.SearchGameName(payload).then(reply=>{

      this.games = reply.SlotGameDefs;
      this.gameName = ''
    })
    this.showGame = !this.showGame
  }

  addDef(){
    
    let payload = this.gds.createPayload();
    payload.SearchTerm = this.progressiveDef;
    this.gds.smqUser.SearchProgressiveDef(payload).then(reply=>{
      this.defs = reply.ProgressiveDefs;
      this.progressiveDef = ''
    })
    this.showDef = !this.showDef
  }

  
  finish(){
    let self = this;
    let payload = this.gds.createPayload();
    payload.SlotView = this.slot;
    this.gds.smqSlotRepairAdmin.UpdateActiveSlot(payload).then(resp => {
      if (!resp.ErrorMessage) {
        this.router.navigateByUrl('effortless/on-floor-slot/' + self.sid);
      }
    });
  }

  cancel(){
    this.router.navigateByUrl('effortless/on-floor-slot/' + this.sid)
  }

}
