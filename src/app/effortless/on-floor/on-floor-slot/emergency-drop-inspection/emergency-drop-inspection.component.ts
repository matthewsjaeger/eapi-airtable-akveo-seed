import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { GDS } from '../../../services/gds.service';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent, NbCheckboxComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-emergency-drop-inspection',
  templateUrl: './emergency-drop-inspection.component.html',
  styleUrls: ['./emergency-drop-inspection.component.scss']
})
export class EmergencyDropInspectionComponent extends EffortlessComponentBase implements OnInit {

  constructor (public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute ) { 
    super (gds, data, menuService) 
  
  }

  ngOnInit() {
  }

  finish(){

  }

  cancel(){
    this.router.navigateByUrl('effortless/on-floor-slot'); 
  }

}
