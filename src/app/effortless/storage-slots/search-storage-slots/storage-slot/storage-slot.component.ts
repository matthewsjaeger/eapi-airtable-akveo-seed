import { Component, OnInit } from '@angular/core';
import { Router, RouterModule,  } from '@angular/router';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { NbMenuService } from '@nebular/theme';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../../services/gds.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-storage-slot',
  templateUrl: './storage-slot.component.html',
  styleUrls: ['./storage-slot.component.scss']
})
export class StorageSlotComponent extends EffortlessComponentBase implements OnInit {
  Slot: any;
  search: any;
  slot: any;
  SlotId: any = '';
  sid: any;

  constructor(public router: Router, public route: ActivatedRoute, public gds: GDS, public data: DataEndpoint, protected menuservice: NbMenuService) {
    super(gds, data, menuservice)
    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
      
       }))
       

      
    }

  ngOnInit() {
    let self = this
    let payload = self.gds.createPayload();
    payload.slot = {};
    payload.slot= self.sid;
    self.gds.smqATR.GetSlotDetails(payload).then(function(reply){
      self.slot = reply.Slot.SlotId;
    }) 

  }

  goBack(){
    this.router.navigateByUrl('effortless/search-storage-slots')
  }
}
