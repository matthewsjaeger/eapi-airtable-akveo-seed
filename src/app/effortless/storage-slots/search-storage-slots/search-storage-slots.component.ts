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

  SlotViews: any;
  
  

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, ) { 
    super (gds, data, menuService)

  }
  

  ngOnInit() {
  }



  searchSlots(){
      var payload = this.gds.createPayload();
      payload.SearchTerm = this.datasearch;
    console.error(this.gds);
      
      this.gds.smqUser.SearchStoredSlots(payload).then(function(reply){
        console.error(reply)
        if (reply.SlotViews.length>0){
          this.FilteredSlotsList = this.createFilteredSlots();
          this.noResults = false;
        } else {
          this.noResults= true;
          this.FilteredSlotsList = []
        }
      });
  }

  selectSlot(){
    //this.gds.smqUser.currentSlots = [slot]
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
