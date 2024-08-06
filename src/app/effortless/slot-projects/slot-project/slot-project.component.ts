import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../services/gds.service';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { RemovalTypeComponent } from './removal-type/removal-type.component';

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
  scheduledDate: Date;


  constructor(private router: Router, protected menuService: NbMenuService, public data: DataEndpoint, public gds: GDS, public route: ActivatedRoute,
    public toastr: NbToastrService, private dialogService: NbDialogService) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.pid = params['pid'];
    }))

  }

  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      this.reload();
    }));
  }

  reload() {
    let self = this
    let payload = self.gds.createPayload();
    payload.SlotProject = {};
    payload.SlotProject.SlotProjectId = self.pid;
    self.gds.smqUser.GetSlotProject(payload).then(function (reply) {
      self.project = reply.SlotProject;
      self.filteredSlots = self.createFilteredSlots(self.project.Slots);
      self.baseFilteredSlots = self.filteredSlots;
      self.scheduledDate = new Date(self.project.DueDate);
      console.error(self.filteredSlots);
      self.loaded = true;
    });
  }

  goBack() {
    this.router.navigateByUrl('effortless/slot-projects');
  }

  editProject() {
    this.router.navigateByUrl('effortless/edit-project/' + this.pid);
  }

  openSlot(slot) {
    let relUrl = this.router.createUrlTree(['effortless/on-floor-slot/' + slot.SlotId]);
    let baseUrl = window.location.href.replace(this.router.url, '');
    window.open(baseUrl + relUrl, '_blank');
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
        , { 'title': 'Request Receive Slot(s)', 'Slots': [], 'isVisable': true, 'selected': false }
      ];

    //template.forEach(function (list) {
    //  slots.forEach(function (slot) {
    //    if (slot.WorkflowState == list.title) {
    //      list.Slots.push(slot);
    //    }
    //  });
    //});

    slots.forEach(function (slot) {
      let matched = false;
      template.forEach(function (list) {
        if (slot.WorkflowState == list.title) {
          list.Slots.push(slot);
          matched = true;
        }
      });
      if (matched == false) {
        let category = { 'title': slot.WorkflowState, 'Slots': [], 'isVisable': true, 'selected': false };
        category.Slots.push(slot);
        template.push(category);
      }
    });

    let i = template.length;
    while (i--) {
      if (template[i].Slots.length == 0) {
        template.splice(i, 1);
      }
    }
    return template;
  };

  addRemoveSlots() {
    this.router.navigateByUrl('effortless/add-remove-slots/' + this.pid);
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

  scheduleConversion() {
    let self = this;
    let list = this.filteredSlots[0];
    this.gds.slotList = [];
    list.Slots.forEach(function (slot) {
      if (slot.selected) {
        self.gds.slotList.push(slot);
      }
    });
    this.router.navigateByUrl('effortless/project-schedule-conversion');
  }

  scheduleMoveToStorage() {
    let self = this;
    let list = this.filteredSlots[0];
    this.gds.slotList = [];
    list.Slots.forEach(function (slot) {
      if (slot.selected) {
        self.gds.slotList.push(slot);
      }
    });
    this.router.navigateByUrl('effortless/project-schedule-move-to-storage');
  }

  scheduleTournament(list) {

  }

  scheduleRemoval() {
    let self = this;
    this.dialogService.open(RemovalTypeComponent, {
      context: {
      }
    }).onClose.subscribe(resp => self.finishRemovalType(resp, self));
  }

  finishRemovalType(resp, self) {
    if (resp) {
      let list = self.filteredSlots[0];
      self.gds.slotList = [];
      list.Slots.forEach(function (slot) {
        if (slot.selected) {
          self.gds.slotList.push(slot);
        }
      });
      this.router.navigateByUrl('effortless/project-schedule-removal/' + resp);
    }
  }

  scheduleStorageToFloor() {
    let self = this;
    let list = this.filteredSlots[0];
    this.gds.slotList = [];
    list.Slots.forEach(function (slot) {
      if (slot.selected) {
        self.gds.slotList.push(slot);
      }
    });
    this.router.navigateByUrl('effortless/project-storage-to-floor');
  }

  requestReceiveSlot() {
    let self = this;
    let payload = self.gds.createPayload();
    let list = this.filteredSlots[0];
    payload.SlotViews = [];
    list.Slots.forEach(function (slot) {
      if (slot.selected) {
        payload.SlotViews.push(slot);
      }
    });
    self.gds.smqSlotRepairAdmin.RequestReceiveSlot(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        self.reload();
      }
    });
  }  
}
