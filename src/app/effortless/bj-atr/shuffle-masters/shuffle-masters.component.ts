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

  initialVisibleListLength: any = 10;
  visibleList: any = 10;
  offSiteShuffleMasters: any[] = [];
  reviewShuffleMasters: any[] = [];
  onSiteShuffleMasters: any[] = [];
  allOnSite: any[] = [];

  constructor(public gds: GDS, public data: DataEndpoint, protected menuService: NbMenuService, public router: Router, public toastr: NbToastrService) {
    super(gds, data, menuService)
  }

  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      this.reload();
    }));
  }

  reload() {
    let self = this;
    let payload = self.gds.createPayload();
    payload.Filter = { "WorkflowStateId": "3D447FB3-A73B-4A09-8E92-775FF4A1FE0D" }; //Off-Site
    self.gds.smqBJFeltLog.GetShuffleMasters(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        console.log("Off Site");
        console.log(reply);
        self.offSiteShuffleMasters = reply.ShuffleMasters;
      }
    });

    payload.Filter = { "WorkflowStateId": "3D447FB3-A73B-4A09-8E92-775FF4A1FE0D" }; //Off-Site
    self.gds.smqBJFeltLog.GetShuffleMasters(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        console.log("Review");
        console.log(reply);
        self.reviewShuffleMasters = reply.ShuffleMasters;
      }
    });


    payload.Filter = { "WorkflowStateId": "D0235746-3CB3-4352-BAA1-89B9A79FE13B" };  //onsite;
    self.gds.smqBJFeltLog.GetShuffleMasters(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        console.log("On Site");
        console.log(reply);
        self.onSiteShuffleMasters = reply.ShuffleMasters;
        self.allOnSite = reply.ShuffleMasters;
      }
    });
  }

  goBack() {
    this.router.navigateByUrl('effortless/bj-atr');
  }

  searchShuffleMasters() {
    if (!/\S/.test(this.searchTerm)) {
      this.onSiteShuffleMasters = this.allOnSite;
      return;
    }
    let self = this;
    let tempShuffleMasters = [];
    this.allOnSite.forEach(function (shuffleMaster) {
      if (shuffleMaster.SerialNumber.toLowerCase().includes(self.searchTerm.toLowerCase()) || shuffleMaster.ShufflerType.toLowerCase().includes(self.searchTerm.toLowerCase())) {
        tempShuffleMasters.push(shuffleMaster);
      }
    });
    this.onSiteShuffleMasters = tempShuffleMasters;
  }

  saveToStorage(ShuffleMaster) {
    console.error('AAAA');
    this.gds.shuffleMaster = ShuffleMaster;
    this.router.navigateByUrl('effortless/shuffle-master');
  }

}
