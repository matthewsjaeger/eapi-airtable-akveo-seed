import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../services/gds.service';
import { EffortlessComponentBase } from '../../efforless-base-component';

@Component({
  selector: 'ngx-slot-project',
  templateUrl: './slot-project.component.html',
  styleUrls: ['./slot-project.component.scss']
})
export class SlotProjectComponent extends EffortlessComponentBase implements OnInit {
  project: any = {};
  filteredSlots = [];
  baseFilteredSlots = [];
  pid: any;
  loaded: boolean = false;
  selectedState: string = "";


  constructor(private router: Router, protected menuService: NbMenuService, public data: DataEndpoint, public gds: GDS, public route: ActivatedRoute
              , public toastr: NbToastrService) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.pid = params['pid'];
    }))

  }

  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      let self = this
      let payload = self.gds.createPayload();
      payload.SlotProject = {};
      payload.SlotProject.SlotProjectId = self.pid;
      self.gds.smqUser.GetSlotProject(payload).then(function (reply) {
        self.project = reply.SlotProject;
        self.filteredSlots = self.createFilteredSlots(self.project.Slots);
        self.baseFilteredSlots = self.filteredSlots;
        console.error(self.filteredSlots);
        self.loaded = true;
      });
    }));
  }

  goBack() {
    this.router.navigateByUrl('effortless/slot-projects');
  }

  editProject() {
    this.router.navigateByUrl('effortless/edit-project/' + this.pid);
  }

  createFilteredSlots = function (slots) {
    var template =
      [
        { 'title': 'Active', 'Slots': [], 'isVisible': true, 'selected': false }
        , { 'title': 'RAM Cleared', 'Slots': [], 'isVisible': true, 'selected': false }
        , { 'title': 'RAM Clear Inspect', 'Slots': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Suspended', 'Slots': [], 'isVisible': true, 'selected': false }
        , { 'title': 'GC Jackpot Verification', 'Slots': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Jackpot Suspension', 'Slots': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Tournament Mode', 'Slots': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Tournament Scheduled', 'Slots': [], 'isVisible': true, 'selected': false }
        , { 'title': 'GC Review', 'Slots': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Stored', 'Slots': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Removal Scheduled', 'Slots': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Request Receive Slot(s)', 'Slots': [], 'isVisable':true, 'selected': false}
      ];

    template.forEach(function (list) {
      slots.forEach(function (slot) {
        if (slot.WorkflowState == list.title) {
          list.Slots.push(slot);
        }
      });
    });

    let i = template.length;
    while (i--) {
      if (template[i].Slots.length == 0) {
        template.splice(i, 1);
      }
    }
    return template;
  };

  addRemoveTables() {
    this.toastr.warning("Not implemented yet.")
  }

  completeProject() {
    console.error(this.filteredSlots);
    console.error(this.selectedState);
    this.toastr.warning("Not implemented yet.")
  }

  consoleError(msg) {
    console.error(msg);
  }

  focusGroup(list) {
    if (list.selected) {
      list.Slots.forEach(function (slot) {
        slot.selected = true;
      });
      this.filteredSlots = [list];
      this.selectedState = list.title;
    } else {
      list.Slots.forEach(function (slot) {
        slot.selected = false;
      });
      this.filteredSlots = this.baseFilteredSlots;
      this.selectedState = "";
    }
  }

  toggleSlot(slot, list) {
    if (this.selectedState == "") {
      this.selectedState = list.title;
      list.selected = true;
      this.filteredSlots = [list];
    }
    slot.selected = slot.selected ? false : true;
    let clearList = true;
    list.Slots.forEach(function (slot) {
      if (slot.selected) clearList = false;
    });
    if (clearList) {
      list.selected = false;
      this.filteredSlots = this.baseFilteredSlots;
      this.selectedState = "";
    }
  }

  scheduleConversion(list) {
    let self = this;
    this.gds.slotList = [];
    list.Slots.forEach(function (slot) {
      if (slot.selected) {
        self.gds.slotList.push(slot);
      }
    });
    this.router.navigateByUrl('effortless/project-schedule-conversion');
  }

  scheduleMoveToStorage(list) {

  }

  scheduleTournament(list) {

  }

  scheduleDestruction(list) {

  }

  scheduleReturn(list) {

  }

  scheduleSale(list) {

  }

  scheduleStorageToFloor(list) {

  }
}
