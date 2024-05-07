import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../../services/gds.service';

@Component({
  selector: 'ngx-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent extends EffortlessComponentBase implements OnInit {
  project: any = {};
  pid: any;
  scheduledDate: Date;

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
        console.error(self.project);
      });
    }));
  }

  goBack(){
    this.router.navigateByUrl('effortless/slot-project/' + this.pid);
  }

  save() {
    let self = this;
    var payload = this.gds.createPayload();
    payload.SlotProject = this.project;
    payload.Scheduled = this.scheduledDate;
    payload.SearchTerm = "ProjectOnly";
    this.gds.smqUser.UpdateSlotProject(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        self.router.navigateByUrl('effortless/slot-project/' + self.pid);
      }
    });
  }
}
