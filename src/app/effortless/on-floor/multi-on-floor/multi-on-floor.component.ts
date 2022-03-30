import { Component, OnInit } from '@angular/core';
import { GDS } from '../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { EffortlessComponentBase } from '../../efforless-base-component';

@Component({
  selector: 'ngx-multi-on-floor',
  templateUrl: './multi-on-floor.component.html',
  styleUrls: ['./multi-on-floor.component.scss']
})
export class MultiOnFloorComponent extends EffortlessComponentBase implements OnInit {

  FilteredSlotsList: any;
  noResults: boolean;
  datasearch: string = '';
  slot: any = '';

  slotViews: any;
  searchTerm: any = '';
  SlotId: any = '';
  sid: any;
  selectedSlots: any = [];
  context: any = 'search';

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }));

  }

  ngOnInit() {
  }

  searchSlots() {
    let self = this
    if (this.searchTerm.trim().length > 0) {
      var payload = this.gds.createPayload();
      payload.SearchTerm = this.searchTerm;
      self.gds.smqUser.SearchOnFloorSlots(payload).then(function (reply) {
        console.error(reply)
        if (reply.SlotViews.length > 0) {
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

  createFilteredSlots() {

  }

  addSlot(slot) {
    var idx = -1;
    this.selectedSlots.forEach((selected, i) => {
      if (slot.SlotId == selected.SlotId) {
        idx = i;
      }
    });
    if (idx < 0) {
      this.selectedSlots.push(slot);
    }
  }

  removeSlot(slot) {
    var idx = -1;
    this.selectedSlots.forEach((selected, i) => {
      if (slot.SlotId == selected.SlotId) {
        idx = i;
      }
    });
    if (idx >= 0) {
      this.selectedSlots.splice(idx, 1);
    }
  }

  actionContext() {
    this.context = 'actions';
    this.searchTerm = "";
    this.slotViews = [];
  }

  searchContext() {
    this.context = 'search';
  }

  scheduleMoveToStorage() {
    this.context = 'search';
    this.gds.slotList = this.selectedSlots;
    this.router.navigateByUrl('effortless/schedule-storage');
  }

}
