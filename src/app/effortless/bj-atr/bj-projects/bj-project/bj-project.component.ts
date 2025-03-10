import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../../services/gds.service';
import { RemovalTypeComponent } from '../../../slot-projects/slot-project/removal-type/removal-type.component';

@Component({
  selector: 'ngx-bj-project',
  templateUrl: './bj-project.component.html',
  styleUrls: ['./bj-project.component.scss']
})
export class BjProjectComponent extends EffortlessComponentBase implements OnInit {
  project: any = {};
  filteredBJTables = [];
  baseFilteredBJTables = [];
  availableActions = {
    'add': false
    , 'completeRemove': false
    , 'remove': false
    , 'scheduleTournament': false
    , 'activateTournament': false
    , 'modify': false
    , 'completeRemoval': false
    , 'completeModification': false
    , 'stopTournament': false
    , 'completeAdd': false
    , 'feltReview': false
    , 'logFeltChange': false

  };
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
    payload.BJProject = {};
    payload.BJProject.BJTableProjectId = self.pid;
    self.gds.smqUser.GetProjects(payload).then(function (reply) {
      reply.BJProjects.forEach(project => {
        if (project.BJTableProjectId == payload.BJProject.BJTableProjectId) {
          self.project = project;
          self.filteredBJTables = self.createFilteredBJTables(self.project.BJTables);
          self.baseFilteredBJTables = self.filteredBJTables;
          self.scheduledDate = new Date(self.project.DueDate);
          self.loaded = true;
        }
      });
    });
  }

  goBack() {
    this.router.navigateByUrl('effortless/bj-projects');
  }

  editProject() {
    this.router.navigateByUrl('effortless/edit-project/' + this.pid);
  }

  openBJTable(table) {
    this.gds.currentBJTables = [table];
    this.router.navigateByUrl('effortless/bj-table');
  }

  configureActions = function (bjTable) {
    this.availableActions = {
      'add': false
      , 'remove': false
      , 'scheduleTournament': false
      , 'activateTournament': false
      , 'modify': false
      , 'completeRemoval': false
      , 'completeModification': false
      , 'stopTournament': false
      , 'completeAdd': false
      , 'feltReview': false
      , 'logFeltChange': false

    };
    switch (bjTable.WorkflowState) {
      case 'In Play':
        this.availableActions.modify = true;
        this.availableActions.remove = true;
        this.availableActions.scheduleTournament = true;
        this.availableActions.logFeltChange = true;
        break;
      case 'Not In Play':
        this.availableActions.add = true;
        this.availableActions.modify = true;
        this.availableActions.scheduleTournament = true;
        break;
      case 'BJ Tournament Scheduled':
        this.availableActions.modify = true;
        this.availableActions.activateTournament = true;
        break;
      case 'Table Add Scheduled':
        this.availableActions.modify = true;
        this.availableActions.completeAdd = true;
        break;
      case 'Table Removal Scheduled':
        this.availableActions.completeRemoval = true;
        break;
      case 'Felt Review':
        this.availableActions.modify = true;
        this.availableActions.feltReview = true;
        break;
      case 'Table Modification Scheduled':
        this.availableActions.completeModification = true;
        break;
      case 'BJ Tournament Active':
        this.availableActions.stopTournament = true;
        break;
    }
  };

  createFilteredBJTables = function (tables) {
    var template =
      [
        { 'title': 'In Play', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Not In Play', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'BJ Tournament Scheduled', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Table Add Scheduled', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Table Removal Scheduled', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Felt Review', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Table Modification Scheduled', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Purchased', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'BJ Tournament Active', 'BJTables': [], 'isVisible': true, 'selected': false }
      ];

    //template.forEach(function (list) {
    //  tables.forEach(function (table) {
    //    if (table.WorkflowState == list.title) {
    //      list.BJTables.push(table);
    //    }
    //  });
    //});

    tables.forEach(function (table) {
      let matched = false;
      template.forEach(function (list) {
        if (table.WorkflowState == list.title) {
          list.BJTables.push(table);
          matched = true;
        }
      });
      if (matched == false) {
        let category = { 'title': table.WorkflowState, 'BJTables': [], 'isVisible': true, 'selected': false };
        category.BJTables.push(table);
        template.push(category);
      }
    });

    let i = template.length;
    while (i--) {
      if (template[i].BJTables.length == 0) {
        template.splice(i, 1);
      }
    }
    return template;
  };

  addRemoveSlots() {
    this.router.navigateByUrl('effortless/add-remove-tables/' + this.pid);
  }

  completeProject() {
    let self = this;
    let payload = self.gds.createPayload();
    payload.BJTableProject = self.project;
    self.gds.smqUser.CompleteProject(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        self.toastr.success("Project completed.");
        self.goBack();
      }
    });
  }

  consoleError(msg) {
    console.error(msg);
  }

  focusGroup(list) {
    if (list.selected) {
      list.BJTables.forEach(function (bjTable) {
        bjTable.selected = true;
      });
      this.filteredBJTables = [list];
      this.selectedState = list.title;
      this.configureActions(list.BJTables[0]);
    } else {
      list.BJTables.forEach(function (bjTable) {
        bjTable.selected = false;
      });
      this.filteredBJTables = this.baseFilteredBJTables;
      this.selectedState = "";
      this.configureActions({ WorkflowState: null });
    }
  }

  toggleBJTable(bjTable, list) {
    if (this.selectedState == "") {
      this.selectedState = list.title;
      list.selected = true;
      this.filteredBJTables = [list];
      this.configureActions(bjTable);
    }
    bjTable.selected = bjTable.selected ? false : true;
    let clearList = true;
    list.BJTables.forEach(function (bjTable) {
      if (bjTable.selected) clearList = false;
    });
    if (clearList) {
      list.selected = false;
      this.filteredBJTables = this.baseFilteredBJTables;
      this.selectedState = "";
      this.configureActions({ WorkflowState: null });
    }
  }

  scheduleConversion() {
    let self = this;
    let list = this.filteredBJTables[0];
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
    let list = this.filteredBJTables[0];
    this.gds.slotList = [];
    list.Slots.forEach(function (slot) {
      if (slot.selected) {
        self.gds.slotList.push(slot);
      }
    });
    this.router.navigateByUrl('effortless/project-schedule-move-to-storage');
  }

  configureSlot() {
    let self = this;
    let list = this.filteredBJTables[0];
    this.gds.slotList = [];
    list.Slots.forEach(function (slot) {
      if (slot.selected) {
        self.gds.slotList.push(slot);
      }
    });
    this.router.navigateByUrl('effortless/configure-slot');
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
      let list = self.filteredBJTables[0];
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
    let list = this.filteredBJTables[0];
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
    let list = this.filteredBJTables[0];
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

  requestLicense() {
    let self = this;
    let payload = self.gds.createPayload();
    let list = this.filteredBJTables[0];
    payload.SlotViews = [];
    list.Slots.forEach(function (slot) {
      if (slot.selected) {
        payload.SlotViews.push(slot);
      }
    });
    self.gds.smqSlotRepairAdmin.RequestLicense(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        self.reload();
      }
    });
  }
  completeAdd() {

  }
  completeRemove() {

  }
  completeModification() {

  }
  stopTournament() {

  }
  feltReview() {

  }
  activateTournament() {

  }
  add() {

  }
  logFeltChange() {

  }
  remove() {

  }
  modify() {

  }
  scheduleTournament() {

  }
}
