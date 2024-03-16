import { Component, OnInit, Input } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-complete-table-modification',
  templateUrl: './complete-table-modification.component.html',
  styleUrls: ['./complete-table-modification.component.scss']
})
export class CompleteTableModificationComponent extends EffortlessComponentBase implements OnInit {
  @Input() BJTable: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<CompleteTableModificationComponent>, private dialogService: NbDialogService, public toastr: NbToastrService) {
    super(gds, data, menuService)
  }

  ngOnInit() {
  }

  confirm() {
    let self = this;
    let payload = self.gds.createPayload();
    payload.BJTables = [self.BJTable];
    console.log(payload);

    self.gds.smqBJFeltLog.CompleteTableModification(payload).then(function (resp) {
      if (resp.ErrorMessage) {
        self.toastr.warning(resp.ErrorMessage);
      } else {
        var payload2 = self.gds.createPayload();
        payload2.SearchTerm = self.BJTable.SerialNumber;
        self.gds.smqUser.SearchBJTables(payload2).then(function (resp) {
          if (resp.ErrorMessage) {
            self.toastr.warning(resp.ErrorMessage);
          } else {
            self.gds.currentBJTables = [resp.BJTables[0]];
            self.dialogRef.close(resp.BJTables[0]);
          }
        });
      }
    })

  }

  close() {
    this.dialogRef.close();
  }

}
