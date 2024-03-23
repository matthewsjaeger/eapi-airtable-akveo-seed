import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { EffortlessComponentBase } from '../../efforless-base-component';

@Component({
  selector: 'ngx-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent extends EffortlessComponentBase implements OnInit {
  Project: any = {
    "MSProperty": "E81E341E-AA08-4ED8-8883-62277750BF25"
  };
  isReady: boolean = false;
  scheduledDate: Date = new Date(new Date().setHours(0, 0, 0, 0));
  searchTerm: any = '';
  slotViews: any;
  FilteredSlotsList: any;
  noResults: boolean;
  addedSlots: any = [];

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
    }));

  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigateByUrl('effortless/slot-projects');
  }

  save() {

  }

  searchSlots() {
    let self = this
    if (this.searchTerm.trim().length > 0) {
      var payload = this.gds.createPayload();
      payload.SearchTerm = this.searchTerm;
      self.gds.smqUser.SearchOnFloorSlots(payload).then(function (reply) {
        console.error(reply)
        if (reply.SlotViews.length > 0) {
          self.slotViews = reply.SlotViews;
          //self.FilteredSlotsList = self.createFilteredSlots();
          self.FilteredSLotsList = reply.SlotViews;
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
    this.addedSlots.forEach((selected, i) => {
      if (slot.SlotId == selected.SlotId) {
        idx = i;
      }
    });
    if (idx < 0) {
      this.addedSlots.push(slot);
    }
  }

  removeSlot(slot) {
    var idx = -1;
    this.addedSlots.forEach((selected, i) => {
      if (slot.SlotId == selected.SlotId) {
        idx = i;
      }
    });
    if (idx >= 0) {
      this.addedSlots.splice(idx, 1);
    }
  }

}
