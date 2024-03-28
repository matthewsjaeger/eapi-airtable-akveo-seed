import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../../services/gds.service';

@Component({
  selector: 'ngx-project-schedule-conversion',
  templateUrl: './project-schedule-conversion.component.html',
  styleUrls: ['./project-schedule-conversion.component.scss']
})
export class ProjectScheduleConversionComponent extends EffortlessComponentBase implements OnInit {

  constructor(private router: Router, protected menuService: NbMenuService, public data: DataEndpoint, public gds: GDS, public route: ActivatedRoute) {
    super(gds, data, menuService)

    //this.safeSubscribe(this.route.params.subscribe((params) => {
    //  this.pid = params['pid'];
    //}))

  }

  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      //let self = this
      //let payload = self.gds.createPayload();
      //payload.SlotProject = {};
      //payload.SlotProject.SlotProjectId = self.pid;
      //console.error(self.gds);
      //self.gds.smqUser.GetSlotProject(payload).then(function (reply) {
      //  self.project = reply.SlotProject;
      //  self.filteredSlots = self.createFilteredSlots(self.project.Slots);
      //  self.baseFilteredSlots = self.filteredSlots;
      //  console.error(self.filteredSlots);
      //  self.loaded = true;
      //});
    }));
  }

}
