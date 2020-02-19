import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../services/gds.service';
import { EffortlessComponentBase } from '../../efforless-base-component';

@Component({
  selector: 'ngx-slot-project',
  templateUrl: './slot-project.component.html',
  styleUrls: ['./slot-project.component.scss']
})
export class SlotProjectComponent extends EffortlessComponentBase implements OnInit {

  pid: any;


  constructor(private router: Router, protected menuService: NbMenuService, public data : DataEndpoint,public gds:GDS, public route: ActivatedRoute) { 
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
      console.error(self.gds);
      self.gds.smqUser.GetSlotViewDetails(payload).then(function (reply) {
        self.pid = reply.SlotProject;
      });
    }));
  }

  goBack(){
    this.router.navigateByUrl('effortless/slot-projects');
  }

  editProject(){
    this.router.navigateByUrl('effortless/edit-project');
  }
}
