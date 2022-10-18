import { Component, OnInit } from '@angular/core';
import { GDS } from '../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { EffortlessComponentBase } from '../../../../efforless-base-component';

@Component({
  selector: 'ngx-installed-details',
  templateUrl: './installed-details.component.html',
  styleUrls: ['./installed-details.component.scss']
})
export class InstalledDetailsComponent extends EffortlessComponentBase implements OnInit {

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, public toastr: NbToastrService) {
    super(gds, data, menuService)

  }

  ngOnInit() {
  }

}
