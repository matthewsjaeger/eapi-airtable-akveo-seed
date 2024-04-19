import { Component, OnInit, Input } from '@angular/core';
import { EffortlessComponentBase } from '../../../../efforless-base-component';
import { DataEndpoint } from '../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbMenuService, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-resolve-read-only',
  templateUrl: './resolve-read-only.component.html',
  styleUrls: ['./resolve-read-only.component.scss']
})
export class ResolveReadOnlyComponent extends EffortlessComponentBase implements OnInit {
  @Input() message: any = "";

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<ResolveReadOnlyComponent>, private dialogService: NbDialogService, public toastr: NbToastrService) {
    super(gds, data, menuService)
  }

  ngOnInit() {
  }

  closeFoo(confirm) {
    this.dialogRef.close(confirm);
  }

}
