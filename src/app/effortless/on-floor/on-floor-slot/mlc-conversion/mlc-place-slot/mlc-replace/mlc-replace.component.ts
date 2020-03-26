import { Component, OnInit, Input } from '@angular/core';
import { GDS } from '../../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { EffortlessComponentBase } from '../../../../../efforless-base-component';

@Component({
  selector: 'ngx-mlc-replace',
  templateUrl: './mlc-replace.component.html',
  styleUrls: ['./mlc-replace.component.scss']
})
export class MlcReplaceComponent extends EffortlessComponentBase implements OnInit {



  sid: any;
  @Input() componentDefList: any;
  @Input() componentList: any;
  @Input() logicCage: any;
  @Input() seal: any;
  newSealNumber: number;
  replacementReason: any;
  sealNumber: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<MlcReplaceComponent>, private dialogService: NbDialogService, public toastr: NbToastrService) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }));

  }
  ngOnInit() {
  }

  cancelReplaceSeal() {
    this.dialogRef.close();
  }




  // next() {
  //   let payload = this.gds.createPayload();
  //   payload.SearchTerm = this.newSealNumber
  //   this.gds.smqUser.ValidateNewSealNumber(payload).then(reply => {
  //     this.sealNumber = reply.SealNumber
  //     if (reply.ErrorMessage) {
  //       this.toastr.warning(reply.ErrorMessage)
       
  //     } else {
        
  //       this.gds.editSealPayload.BrokenSeals.push({ SealNumber: this.seal.SealNumber, BrokenReason: this.replacementReason })
  //       console.error(this.seal.SealNumber)
  //       this.dialogService.open(PlaceSlotSealsComponent, {
  //         context: {
  //           'componentDefList': this.componentDefList,
  //           'componentList': this.componentList,
  //           'logicCage': this.logicCage,
  //           'seal': this.seal,
  //           'newSealNumber': this.newSealNumber,
  //           'replacement': this.replacementReason
  //         }
  //       })
  //       this.dialogRef.close()
  //     }
  //   })
  // }

}
