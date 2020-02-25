import { Component, OnInit, Input } from '@angular/core';
import { EffortlessComponentBase } from '../../../../../efforless-base-component';
import { GDS } from '../../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef } from '@nebular/theme';
import { ReplaceSealComponent } from '../replace-seal.component';

@Component({
  selector: 'ngx-place-slot-seals',
  templateUrl: './place-slot-seals.component.html',
  styleUrls: ['./place-slot-seals.component.scss']
})
export class PlaceSlotSealsComponent extends EffortlessComponentBase implements OnInit {
  
  componentDefList: any;
  logicCage: any;
  seal: any;
  @Input() sid: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, 
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<PlaceSlotSealsComponent>  ) { 
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

}
