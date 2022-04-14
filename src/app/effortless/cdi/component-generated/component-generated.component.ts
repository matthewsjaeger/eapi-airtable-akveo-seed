import { Component, OnInit, Input } from '@angular/core';
import { GDS } from '../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { EffortlessComponentBase } from '../../efforless-base-component';

@Component({
  selector: 'ngx-component-generated',
  templateUrl: './component-generated.component.html',
  styleUrls: ['./component-generated.component.scss']
})
export class ComponentGeneratedComponent extends EffortlessComponentBase implements OnInit {
  @Input() scd: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<ComponentGeneratedComponent>, private dialogService: NbDialogService, public toastr: NbToastrService) {
    super(gds, data, menuService)
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close()
  }

}
