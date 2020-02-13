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

  sid: any;
  slot: any;
  checked = false;

  emails = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ];

  authorizeds = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ];

  procedures = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ];

  secures = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ];

followedProcedures = [
    { value: 'This is value 1', label: 'Yes' },
    { value: 'This is value 2', label: 'No' },
    { value: 'This is value 3', label: 'N/A' },
  ];

  compliants = [
    { value: 'This is value 1', label: 'Pass' },
    { value: 'This is value 2', label: 'Fail' },
  ];

  constructor (public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute ) { 
    super (gds, data, menuService) 

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];   
    }));
  
  }

  ngOnInit() {
  }



  finish(){

  }

  cancel(){
    this.router.navigateByUrl('effortless/on-floor-slot/' + this.slot.SlotId); 
  }

}
