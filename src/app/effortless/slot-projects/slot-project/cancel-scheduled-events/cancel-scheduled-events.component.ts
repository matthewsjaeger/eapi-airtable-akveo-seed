import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../../services/gds.service';

@Component({
  selector: 'ngx-cancel-scheduled-events',
  templateUrl: './cancel-scheduled-events.component.html',
  styleUrls: ['./cancel-scheduled-events.component.scss']
})
export class CancelScheduledEventsComponent extends EffortlessComponentBase implements OnInit {
  events = [];
  baseFilteredSlots = [];
  sid: any;
  loaded: boolean = false;
  selectedState: string = "";
  scheduledDate: Date;


  constructor(private router: Router, protected menuService: NbMenuService, public data: DataEndpoint, public gds: GDS, public route: ActivatedRoute,
    public toastr: NbToastrService, private dialogService: NbDialogService) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }))

  }

  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      let self = this
      let payload = self.gds.createPayload();
      payload.SlotView = {};
      payload.SlotView.SlotId = self.sid;
      self.gds.smqSlotRepairAdmin.GetOpenEvents(payload).then(function (reply) {
        if (reply.ErrorMessage) {
          self.toastr.danger(reply.ErrorMessage);
        } else {
          reply.SlotEvents.forEach(function (event) {
            event.selected = true;
          });
          self.events = reply.SlotEvents
          console.error(self.events);
          self.loaded = true;
        }
      });
    }));
  }

  goBack() {
    this.router.navigateByUrl('effortless/slot-projects');
  }

  toggleEvent(event) {
    console.error('asdf');
    if (event.selected) {
      event.selected = false;
    } else {
      event.selected = true;
    }
  }

  cancelEvents() {

  }
}
