import { Component, OnInit, Input } from '@angular/core';
import { GDS } from '../../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef } from '@nebular/theme';
import { EffortlessComponentBase } from '../../../../../efforless-base-component';

@Component({
  selector: 'ngx-lsc-break',
  templateUrl: './lsc-break.component.html',
  styleUrls: ['./lsc-break.component.scss']
})
export class LscBreakComponent extends EffortlessComponentBase implements OnInit {

  replacementReason: any;
  sid: any;
  @Input() seal: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<LscBreakComponent>) {
    super(gds, data, menuService)


    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }));

  }

  ngOnInit() {

    console.error(this.seal)
  }

  break() {
    this.gds.editSealPayload.BrokenSeals.push({ SealNumber: this.seal.SealNumber, BrokenReason: this.replacementReason });
    this.gds.editSealsUpdated$.next(true);
    this.dialogRef.close()
    console.error(this.seal.SealNumber)
    console.error(this.replacementReason)
  }

  cancelBreakSeal() {
    this.dialogRef.close();
  }


}
