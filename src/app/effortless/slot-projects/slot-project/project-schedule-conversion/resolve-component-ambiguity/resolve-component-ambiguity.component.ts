import { Component, OnInit, Input } from '@angular/core';
import { GDS } from '../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { EffortlessComponentBase } from '../../../../efforless-base-component';

@Component({
  selector: 'ngx-resolve-component-ambiguity',
  templateUrl: './resolve-component-ambiguity.component.html',
  styleUrls: ['./resolve-component-ambiguity.component.scss']
})
export class ResolveComponentAmbiguityComponent extends EffortlessComponentBase implements OnInit {
  @Input() scds: any = [];
  @Input() slot: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<ResolveComponentAmbiguityComponent>, private dialogService: NbDialogService, public toastr: NbToastrService) {
    super(gds, data, menuService)
  }

  ngOnInit() {
  }

  selectScd(selected) {
    this.dialogRef.close(selected);
  }

  close() {
    this.dialogRef.close();
  }

}
