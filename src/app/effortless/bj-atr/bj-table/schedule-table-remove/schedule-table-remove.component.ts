import { Component, OnInit } from '@angular/core';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-schedule-table-remove',
  templateUrl: './schedule-table-remove.component.html',
  styleUrls: ['./schedule-table-remove.component.scss']
})
export class ScheduleTableRemoveComponent extends EffortlessComponentBase implements OnInit {
  BJTable: any = {};
  scheduledDate: Date = new Date(new Date().setHours(0,0,0,0));

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, public toastr: NbToastrService, private dialogService: NbDialogService) {
    super(gds, data, menuService)

  }

  ngOnInit() {
    if (!this.gds || !this.gds.currentBJTables || this.gds.currentBJTables.length < 1) {
      this.router.navigateByUrl('effortless/search-tables');
    } else {
      this.BJTable = this.gds.currentBJTables[0];
    }
  }

  confirm() {
    let self = this;
    let payload = self.gds.createPayload();
    payload.BJTables = [self.BJTable];
    payload.Scheduled = self.scheduledDate;
    console.error(payload);

    self.gds.smqBJFeltLog.ScheduleTableRemoval(payload).then(function (resp) {
      var payload2 = self.gds.createPayload();
      payload2.SearchTerm = self.BJTable.SerialNumber;
      self.gds.smqUser.SearchBJTables(payload2).then(function (resp) {
        self.gds.currentBJTables = resp.BJTables[0];
        self.router.navigateByUrl('effortless/bj-table');
      });
    })
  }

  back() {
    this.router.navigateByUrl('effortless/bj-table');
  }

}
