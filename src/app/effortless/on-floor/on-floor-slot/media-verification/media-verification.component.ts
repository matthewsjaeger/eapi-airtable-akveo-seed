import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GDS } from '../../../services/gds.service';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-media-verification',
  templateUrl: './media-verification.component.html',
  styleUrls: ['./media-verification.component.scss']
})
export class MediaVerificationComponent extends EffortlessComponentBase implements OnInit {

  paybacks = [
    { value: 'Pass', label: 'Pass' },
    { value: 'Fail', label: 'Fail' },
  ];

  programs = [
    { value: 'Yes', label: 'Pass' },
    { value: 'No', label: 'Fail' },
  ];

  bets = [
    { value: 'Yes', label: 'Pass' },
    { value: 'No', label: 'Fail' },
  ];

  credits = [
    { value: 'Yes', label: 'Pass' },
    { value: 'No', label: 'Fail' },
  ];

  checks = [
    { value: 'Pass', label: 'Pass' },
    { value: 'Fail', label: 'Fail' },
    { value: 'No TITO', label: 'No TITO' },
  ];

  verifys = [
    { value: 'Pass', label: 'Pass' },
    { value: 'Fail', label: 'Fail' },
    { value: 'No TITO', label: 'No TITO' },
  ];

  signatures = [
    { value: 'Pass', label: 'Pass' },
    { value: 'Fail', label: 'Fail' },
    { value: 'Not Tested', label: 'Not Tested' },

  ];
  

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, ) { 
    super (gds, data, menuService)

  }

  ngOnInit() {
  }

}
