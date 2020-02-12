import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GDS } from '../services/gds.service';
import { EffortlessComponentBase } from '../efforless-base-component';
import { DataEndpoint } from '../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-on-floor',
  templateUrl: './on-floor.component.html',
  styleUrls: ['./on-floor.component.scss']
})
export class OnFloorComponent extends EffortlessComponentBase implements OnInit {

  FilteredSlotsList: any;
  noResults: boolean;
  datasearch : string = '';
  slot: any = '';

  slotViews: any;
  searchTerm: any = '';
  SlotId: any = '';

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, ) { 
    super (gds, data, menuService)

  }

  ngOnInit() {
  }

  searchSlots(){
    let self = this
    if (this.searchTerm.trim().length>0) {
      var payload = this.gds.createPayload();
      payload.SearchTerm = this.searchTerm;
      self.gds.smqUser.SearchOnFloorSlots(payload).then(function(reply){
        if (reply.SlotViews.length>0){
          self.slotViews = reply.SlotViews
          self.FilteredSlotsList = self.createFilteredSlots();
          self.noResults = false;
        } else {
          self.noResults = true;
          self.FilteredSlotsList = []
        }
      });
    } else {
      self.FilteredSlotsList = [];
      self.noResults = false;
    }

    }
  
    createFilteredSlots(){

    }

    selectSlot(slot){
      this.router.navigateByUrl('effortless/on-floor-slot/' + slot.SlotId );

    }


}


