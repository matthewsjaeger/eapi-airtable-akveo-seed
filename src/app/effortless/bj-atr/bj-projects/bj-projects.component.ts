import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-bj-projects',
  templateUrl: './bj-projects.component.html',
  styleUrls: ['./bj-projects.component.scss']
})
export class BjProjectsComponent extends EffortlessComponentBase implements OnInit {

  slotProjects: any[] = [];
  createFilteredSlots: any;
  BJProject: any;
  slotProject: any = '';
  pid: any;
  loading: boolean = false;

  constructor(public gds: GDS, public data: DataEndpoint, protected menuService: NbMenuService, public router: Router, public toastr: NbToastrService) {
    super(gds, data, menuService)

  }


  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      let self = this
      var payload = self.gds.createPayload();
      // payload.SlotProject = self.slotProject
      this.loading = true;
      self.gds.smqUser.GetProjects(payload).then(function (reply) {
        console.error(reply);
        self.slotProjects = self.sortProjects(reply.BJProjects);
        self.loading = false;
      }).catch(function (error) {
        self.toastr.warning(error);
        self.loading = false;
      });
    }));

  }

  reload(self: this) {
    self.loading = true;
  }

  openProject(project) {
    this.router.navigateByUrl('effortless/bj-project/' + project.BJTableProjectId);
  }

  newProject() {
    this.router.navigateByUrl('effortless/new-project');
  }

  sortProjects(projects) {
    var ret = projects.sort((a, b) => (a.DueDate < b.DueDate) ? 1 : ((b.DueDate < a.DueDate) ? -1 : 0));
    console.error('AA', ret);
    ret.forEach(project => {
      console.error('BB', project);
      console.error('CC', project.Description);
      if (project.Description && project.Description.length > 100) {
        project.DisplayDescription = project.Description.substring(0, 100) + '...';
      } else {
        project.DisplayDescription = project.Description;
      }
    });
    console.error('DD', ret);
    return ret;
  }
}
