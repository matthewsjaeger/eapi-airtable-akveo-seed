import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-shuffle-master',
  templateUrl: './shuffle-master.component.html',
  styleUrls: ['./shuffle-master.component.scss']
})
export class ShuffleMasterComponent extends EffortlessComponentBase implements OnInit {

  shuffleMaster: any = {};

  constructor(public gds: GDS, public data: DataEndpoint, protected menuService: NbMenuService, public router: Router, public toastr: NbToastrService) {
    super(gds, data, menuService)
  }

  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      this.reload();
    }));
  }

  reload() {
    console.error('BBBB');
    if (!this.gds.shuffleMaster || !this.gds.shuffleMaster.ShuffleMasterId) {
      this.router.navigateByUrl('effortless/shuffle-masters');
    } else {
      this.shuffleMaster = this.gds.shuffleMaster;
    }
  }

  serviceShuffleMaster() {

  }

  shuffleMasterVerification() {

  }
}
