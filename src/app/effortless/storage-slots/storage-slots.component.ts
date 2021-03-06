import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EffortlessComponentBase } from '../efforless-base-component';
import { NbMenuService } from '@nebular/theme';
import { DataEndpoint } from '../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../services/gds.service';


@Component({
  selector: 'ngx-storage-slots',
  templateUrl: './storage-slots.component.html',
  styleUrls: ['./storage-slots.component.scss']
})
export class StorageSlotsComponent extends EffortlessComponentBase implements OnInit {

  

  constructor(private router: Router, protected menuService: NbMenuService, public data : DataEndpoint, public gds:GDS) { 
    super(gds, data, menuService)
    
    
  }

  ngOnInit() {
  }

searchSlots(){
  this.router.navigateByUrl('effortless/search-storage-slots'); 
}

}
