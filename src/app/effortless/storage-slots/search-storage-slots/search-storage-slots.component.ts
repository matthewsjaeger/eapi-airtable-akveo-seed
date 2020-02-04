import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GDS } from '../../services/gds.service';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent } from '@nebular/theme';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'ngx-search-storage-slots',
  templateUrl: './search-storage-slots.component.html',
  styleUrls: ['./search-storage-slots.component.scss']
})
export class SearchStorageSlotsComponent extends EffortlessComponentBase implements OnInit {
  FilteredSlotsList: any;
  noResults: boolean;
  datasearch : string = '';

  slotViews: any;
  searchTerm: any = '';
  

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, ) { 
    super (gds, data, menuService)

  }
  

  ngOnInit() {
  }



  searchSlots(){
    let self = this
      var payload = this.gds.createPayload();
      payload.SearchTerm = this.searchTerm;

      
      this.gds.smqUser.SearchStoredSlots(payload).then(function(reply){
        console.error(reply)
        if (reply.SlotViews.length>0){
          self.slotViews = reply.SlotViews
          self.FilteredSlotsList = self.createFilteredSlots();
          self.noResults = false;
        } else {
          self.noResults= true;
          self.FilteredSlotsList = []
        }
      });
  }

  selectSlot(){
    //this.gds.smqUser.currentSlots = [slot]
    this.router.navigateByUrl('effortless/storage-slot');
  }

  createFilteredSlots(){
     var template =
     [
      { 'title': 'Stored', 'Slots': [], 'isVisible':true, 'selected':false }
      , { 'title': 'Stored - Conversion Scheduled', 'Slots': [], 'isVisible':true, 'selected':false }
      , { 'title': 'Removal Scheduled', 'Slots': [], 'isVisible':true, 'selected':false } 
      , { 'title': 'Physically Removed', 'Slots': [], 'isVisible':true, 'selected':false }
     ];
     //template.forEach((NbListComponent))
  }

   

  goBack(){
    this.router.navigateByUrl('effortless/storage-slots');
  }


}
