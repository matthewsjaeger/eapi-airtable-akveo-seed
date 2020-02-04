import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { NbMenuService } from '@nebular/theme';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../../services/gds.service';


@Component({
  selector: 'ngx-storage-slot',
  templateUrl: './storage-slot.component.html',
  styleUrls: ['./storage-slot.component.scss']
})
export class StorageSlotComponent extends EffortlessComponentBase implements OnInit {

  serialNumber: any;
  Slots: any;

  constructor(public router: Router, public gds: GDS, public data: DataEndpoint, protected menuservice: NbMenuService) {
    super(gds, data, menuservice)
  

   }
   



  ngOnInit() {

    this.gds.smqUser = {}
    this.gds.smqUser.editingSlot = false;
    this.Slots = this.gds.GAINSUser.currentSlots;
    console.log(this.Slots)
  }

  goBack(){
    this.router.navigateByUrl('effortless/search-storage-slots')
  }
}
