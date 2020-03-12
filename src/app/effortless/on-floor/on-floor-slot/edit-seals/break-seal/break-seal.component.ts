import { Component, OnInit } from '@angular/core';
import { GDS } from '../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef } from '@nebular/theme';
import { AddSealComponent } from '../add-seal/add-seal.component';
import { EffortlessComponentBase } from '../../../../efforless-base-component';

@Component({
  selector: 'ngx-break-seal',
  templateUrl: './break-seal.component.html',
  styleUrls: ['./break-seal.component.scss']
})
export class BreakSealComponent extends EffortlessComponentBase implements OnInit {


  ReplacementReason: any;

  sid: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<BreakSealComponent>) {
    super(gds, data, menuService)


    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }));

  }

  ngOnInit() {

  }

  break() {


  }

  cancelBreakSeal() {
    this.dialogRef.close();
  }


}
