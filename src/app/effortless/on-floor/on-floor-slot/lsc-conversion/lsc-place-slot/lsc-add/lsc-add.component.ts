import { Component, OnInit, Input } from '@angular/core';
import { NbDialogService, NbMenuService, NbDialogRef, NbToastrService } from '@nebular/theme';
import { GDS } from '../../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { EffortlessComponentBase } from '../../../../../efforless-base-component';
import { LscPlaceConversionComponent } from '../lsc-place-conversion/lsc-place-conversion.component';

@Component({
  selector: 'ngx-lsc-add',
  templateUrl: './lsc-add.component.html',
  styleUrls: ['./lsc-add.component.scss']
})
export class LscAddComponent extends EffortlessComponentBase implements OnInit {
  sid: any;
  seal: any;
  seals: any;

  @Input() componentDefList: any;
  @Input() componentList: any;
  @Input() logicCage: any;


  newSealNumber: any;
  sealNumber: any;

  constructor(public gds: GDS,
    public router: Router,
    public data: DataEndpoint,
    protected menuService: NbMenuService,
    public route: ActivatedRoute,
    protected dialogRef: NbDialogRef<LscAddComponent>,
    private dialogService: NbDialogService,
    public toastr: NbToastrService) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }));

  }

  ngOnInit() {

  }

  cancelAddSeal() {
    this.dialogRef.close()
  }

  next() {
    let payload = this.gds.createPayload();
    payload.SearchTerm = this.newSealNumber
    this.gds.smqUser.ValidateNewSealNumber(payload).then(reply => {
      this.sealNumber = reply.SealNumber
      if (reply.ErrorMessage) {
        this.toastr.warning(reply.ErrorMessage)
        
      } 
      else {
        this.dialogService.open(LscPlaceConversionComponent, {
          context: {
            'newSealNumber': this.newSealNumber,
            'componentDefList': this.componentDefList,
            'componentList': this.componentList,
            'logicCage': this.logicCage
          }
        })
        this.dialogRef.close()
      }
    })

  }

}
