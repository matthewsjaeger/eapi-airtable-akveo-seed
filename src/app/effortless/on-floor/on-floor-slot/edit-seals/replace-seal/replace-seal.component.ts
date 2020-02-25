import { Component, OnInit, Input } from '@angular/core';
import { GDS } from '../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef, NbDialogService } from '@nebular/theme';
import { AddSealComponent } from '../add-seal/add-seal.component';
import { EffortlessComponentBase } from '../../../../efforless-base-component';
import { PlaceSlotSealsComponent } from './place-slot-seals/place-slot-seals.component';

@Component({
  selector: 'ngx-replace-seal',
  templateUrl: './replace-seal.component.html',
  styleUrls: ['./replace-seal.component.scss']
})
export class ReplaceSealComponent extends EffortlessComponentBase implements OnInit {
  
  @Input() sid: any;
  componentDefList: any;
  logicCage: any;
  seal: any;
  newSealNumber: number;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, 
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<ReplaceSealComponent>, private dialogService: NbDialogService ) { 
    super (gds, data, menuService) 

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];   
    }));

  } 
  ngOnInit() {
    console.error(this.sid)
    
    this.safeSubscribe(this.gds.onReady().subscribe(ready=>{
     let self = this
     let payload = self.gds.createPayload()
     payload.SearchTerm = self.sid
     self.gds.smqATR.GetInstalledComponents(payload).then(function (reply){
       console.error(reply)
       self.componentDefList = reply.SlotComponentDefs
       self.logicCage = reply.SlotComponent
       self. seal = reply.SlotSeal
     });
   }))
  }

  cancelReplaceSeal(){
    this.dialogRef.close();
  }

  next(){
    this.dialogService.open(PlaceSlotSealsComponent, {
      context: {
        'sid': this.sid,
        'newSeal': this.newSealNumber
      }
    })
  }

}
