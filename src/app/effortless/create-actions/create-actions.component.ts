import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../efforless-base-component';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';
import { DataEndpoint } from '../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../services/gds.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-create-actions',
  templateUrl: './create-actions.component.html',
  styleUrls: ['./create-actions.component.scss']
})
export class CreateActionsComponent extends EffortlessComponentBase implements OnInit {
  loaded: boolean = false;

  constructor(private router: Router, protected menuService: NbMenuService, public data: DataEndpoint, public gds: GDS, public route: ActivatedRoute,
    public toastr: NbToastrService, private dialogService: NbDialogService) {
    super(gds, data, menuService)

  }

  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      this.loaded = true;
    }));
  }

  createSlot() {
    this.router.navigateByUrl('effortless/create-slot');
  }
}
