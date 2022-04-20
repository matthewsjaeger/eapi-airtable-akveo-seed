import { Component, OnInit, Input } from '@angular/core';
import { GDS } from '../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { EffortlessComponentBase } from '../efforless-base-component';

@Component({
  selector: 'ngx-cdi-status',
  templateUrl: './cdi-status.component.html',
  styleUrls: ['./cdi-status.component.scss']
})
export class CdiStatusComponent extends EffortlessComponentBase implements OnInit {
  @Input() scd: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<CdiStatusComponent>, private dialogService: NbDialogService, public toastr: NbToastrService) {
    super(gds, data, menuService)
  }

  ngOnInit() {
  }

  approved() {
    this.scd.WorkflowState = 'Approved';
    this.dialogRef.close(this.scd);
  }

  inactive() {
    this.scd.WorkflowState = 'Inactive';
    this.dialogRef.close(this.scd);
  }
}
