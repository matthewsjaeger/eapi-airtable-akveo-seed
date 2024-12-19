import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-shuffle-masters',
  templateUrl: './shuffle-masters.component.html',
  styleUrls: ['./shuffle-masters.component.scss']
})
export class ShuffleMastersComponent extends EffortlessComponentBase implements OnInit {

  slots: any[] = [];
  rechecks: any[] = [];
  createFilteredSlots: any;
  BJProject: any;
  slotProject: any = '';
  pid: any;
  loading: boolean = false;
  searchTerm: string = '';


  constructor(public gds: GDS, public data: DataEndpoint, protected menuService: NbMenuService, public router: Router, public toastr: NbToastrService) {
    super(gds, data, menuService)
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigateByUrl('effortless/bj-atr');
  }

}
