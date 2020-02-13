import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GDS } from '../../../services/gds.service';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-preventative-maintenance',
  templateUrl: './preventative-maintenance.component.html',
  styleUrls: ['./preventative-maintenance.component.scss']
})
export class PreventativeMaintenanceComponent extends EffortlessComponentBase implements OnInit {

  vaccums = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
    { value: 'N/A', label: 'N/A' },
  ];

  blowOuts = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
    { value: 'N/A', label: 'N/A' },
  ];

  touchScreens = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
    { value: 'N/A', label: 'N/A' },
  ];

  testButtons = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
    { value: 'N/A', label: 'N/A' },
  ];

  dbas = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
    { value: 'N/A', label: 'N/A' },
  ];

  printers = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
    { value: 'N/A', label: 'N/A' },
  ];

  doors = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
    { value: 'N/A', label: 'N/A' },
  ];

  

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, ) { 
    super (gds, data, menuService)

  }

  ngOnInit() {
  }

}
