import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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



  constructor(private router: Router, protected menuService: NbMenuService, public data : DataEndpoint,public gds:GDS) { 
    super(gds, data, menuService)
    
  }

  ngOnInit() {
  }

  goBack(){
    this.router.navigateByUrl('effortless/slot-projects');
  }

  editProject(){
    this.router.navigateByUrl('effortless/edit-project');
  }
}
