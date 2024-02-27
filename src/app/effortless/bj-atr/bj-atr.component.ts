import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../efforless-base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { GDS } from '../services/gds.service';
import { DataEndpoint } from '../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-bj-atr',
  templateUrl: './bj-atr.component.html',
  styleUrls: ['./bj-atr.component.scss']
})
export class BjAtrComponent extends EffortlessComponentBase implements OnInit {
  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, public toastr: NbToastrService, private dialogService: NbDialogService) {
    super(gds, data, menuService)

  }

  ngOnInit() {
  }

  openBJProjects() {

  }

  openBJTables() {

  }

  openShufflers() {

  }

  openATR() {

  }
}
