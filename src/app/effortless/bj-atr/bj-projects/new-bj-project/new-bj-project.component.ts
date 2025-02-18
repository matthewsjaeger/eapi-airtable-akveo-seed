import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-new-bj-project',
  templateUrl: './new-bj-project.component.html',
  styleUrls: ['./new-bj-project.component.scss'],
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
export class NewBjProjectComponent extends EffortlessComponentBase implements OnInit {
  Project: any = {
    "MSProperty": "ADC95176-AD53-4D6A-88A9-C1B24B38BA69"
  };
  isReady: boolean = false;
  scheduledDate: Date = new Date(new Date().setHours(0, 0, 0, 0));
  searchTerm: any = '';
  slotViews: any = [];
  FilteredSlotsList: any = [];
  noResults: boolean;
  addedSlots: any = [];
  loading: boolean = false;


  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute,
    public toastr: NbToastrService) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
    }));

  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigateByUrl('effortless/bj-projects');
  }

  save() {
    let self = this;
    var payload = this.gds.createPayload();
    payload.SlotProject = this.Project;
    payload.BJTables = this.addedSlots;
    payload.Scheduled = this.scheduledDate;
    this.gds.smqUser.CreateSlotProject(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        self.router.navigateByUrl('effortless/slot-projects');
      }
    });
  }

  searchSlots() {
    let self = this
    if (this.searchTerm.trim().length > 0) {
      var payload = this.gds.createPayload();
      payload.SearchTerm = this.searchTerm;
      this.loading = true;
      self.gds.smqUser.SearchBJTables(payload).then(function (reply) {
        self.loading = false;
        console.error(reply)
        if (reply.BJTables.length > 0) {
          self.slotViews = reply.BJTables;
          self.FilteredSlotsList = reply.BJTables;
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

  createFilteredSlots() {

  }

  addSlot(slot) {
    console.error('AAA', slot);
    var idx = -1;
    this.addedSlots.forEach((selected, i) => {
      if (slot.BJTableId == selected.BJTableId) {
        console.error('CCC', slot.BJTableId);
        console.error(selected.BJTableId);
        idx = i;
      }
    });
    if (idx < 0) {
      console.error('BBB', 'pushing');
      this.addedSlots.push(slot);
    }

    idx = -1;
    this.FilteredSlotsList.forEach((selected, i) => {
      if (slot.BJTableId == selected.BJTableId) {
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
      if (slot.BJTableId == selected.BJTableId) {
        idx = i;
      }
    });
    if (idx >= 0) {
      this.addedSlots.splice(idx, 1);
    }
  }

}
