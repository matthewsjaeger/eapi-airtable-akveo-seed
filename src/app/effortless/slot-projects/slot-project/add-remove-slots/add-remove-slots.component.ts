import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../../services/gds.service';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';


@Component({
  selector: 'ngx-add-remove-slots',
  templateUrl: './add-remove-slots.component.html',
  styleUrls: ['./add-remove-slots.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(100%)' }),
          stagger(100, [
            animate('0.3s', style({ opacity: 1, transform: 'none' }))
          ])
        ], { optional: true }),
        query(':leave', [
          animate('0.3s', style({ opacity: 0, transform: 'translateX(-100%)' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class AddRemoveSlotsComponent extends EffortlessComponentBase implements OnInit {
  project: any = {};
  pid: any;
  scheduledDate: Date;
  addedSlots: any = [];
  slotViews: any = [];
  FilteredSlotsList: any = [];
  loading: boolean = false;
  searchTerm: any = '';
  noResults: boolean;
  isReady: boolean = false;

  constructor(private router: Router, protected menuService: NbMenuService, public data: DataEndpoint, public gds: GDS, public route: ActivatedRoute,
    public toastr: NbToastrService) {
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
        self.scheduledDate = new Date(self.project.DueDate);
        self.addedSlots = self.project.Slots;
        self.addedSlots.sort(function (a, b) {
          return ((a.WorkflowState < b.WorkflowState) ? -1 : ((a.WorkflowState > b.WorkflowState) ? 1 : 0));
        })
        console.error(self.project);
      });
    }));
  }

  save() {
    let self = this;
    var payload = this.gds.createPayload();
    payload.SlotProject = this.project;
    payload.SlotViews = this.addedSlots;
    payload.SearchTerm = "SlotsOnly";
    this.gds.smqUser.UpdateSlotProject(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        self.router.navigateByUrl('effortless/slot-project/' + self.pid);
      }
    });
  }

  searchSlots() {
    let self = this
    if (this.searchTerm.trim().length > 0) {
      var payload = this.gds.createPayload();
      payload.SearchTerm = this.searchTerm;
      this.loading = true;
      self.gds.smqUser.SearchAllSlots(payload).then(function (reply) {
        self.loading = false;
        console.error(reply)
        if (reply.SlotViews.length > 0) {
          self.slotViews = reply.SlotViews;
          self.FilteredSlotsList = reply.SlotViews;
          self.noResults = false;
        } else {
          self.noResults = true;
          self.FilteredSlotsList = []
        }
      }).catch(function (error) {
        self.loading = false;
      });
    } else {
      self.FilteredSlotsList = [];
      self.noResults = false;
    }

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

    idx = -1;
    this.FilteredSlotsList.forEach((selected, i) => {
      if (slot.SlotId == selected.SlotId) {
        idx = i;
      }
    });
    if (idx >= 0) {
      this.FilteredSlotsList.splice(idx, 1);
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

  goBack() {
    this.router.navigateByUrl('effortless/slot-project/' + this.pid);
  }



}
