import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EffortlessComponentBase } from '../efforless-base-component';
import { NbMenuService } from '@nebular/theme';
import { DataEndpoint } from '../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../services/gds.service';

@Component({
  selector: 'ngx-slot-projects',
  templateUrl: './slot-projects.component.html',
  styleUrls: ['./slot-projects.component.scss']
})
export class SlotProjectsComponent extends EffortlessComponentBase implements OnInit {
  
  slotProjects: any [] = [];
  createFilteredSlots: any;
  BJProject: any;
  slotProject: any;


  constructor(public gds: GDS, public data: DataEndpoint, protected menuService: NbMenuService, public router: Router) { 
    super(gds, data, menuService)
  
    
  }
  

  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      let self = this
      var payload = self.gds.createPayload();
      // payload.SlotProject = self.slotProject
      self.gds.smqUser.GetSlotProjects(payload).then(function(reply){
        console.log(reply);
        self.slotProjects = reply.SlotProjects;
      });
  }));

  }

  

  reload(self:this){
    self.loading = true;
  }

  openProject(){
    this.router.navigateByUrl('effortless/slot-project');
  }

  newProject(){
    this.router.navigateByUrl('effortless/new-project');
  }
}
