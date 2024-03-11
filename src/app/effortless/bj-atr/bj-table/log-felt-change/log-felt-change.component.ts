import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-log-felt-change',
  templateUrl: './log-felt-change.component.html',
  styleUrls: ['./log-felt-change.component.scss']
})
export class LogFeltChangeComponent extends EffortlessComponentBase implements OnInit {
  BJTable: any = {};
  reason: string = "";
  comments: string = "";

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
    self.BJTable.Checklist = { "ReasonForFeltChange": self.reason, "Comments": self.comments };
    self.BJTable.ChecklistMetadata = { "PercentComplete": "100", "ComplianceStatus": "0" }
    payload.BJTables = [self.BJTable];
    console.error(payload);

    self.gds.smqBJFeltLog.LogFeltChange(payload).then(function (resp) {
      //var payload2 = self.gds.createPayload();
      //payload2.SearchTerm = self.BJTable.SerialNumber;
      //self.gds.smqUser.SearchBJTables(payload2).then(function (resp) {
      //  self.gds.currentBJTables = resp.BJTables[0];
      //  self.router.navigateByUrl('effortless/bj-table');
      //});
      self.router.navigateByUrl('effortless/bj-table');
    })
  }

  back() {
    this.router.navigateByUrl('effortless/bj-table');
  }

}
