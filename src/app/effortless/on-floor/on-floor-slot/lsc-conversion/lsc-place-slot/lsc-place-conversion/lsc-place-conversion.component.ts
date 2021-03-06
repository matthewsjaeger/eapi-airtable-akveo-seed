import { Component, OnInit, Input } from '@angular/core';
import { EffortlessComponentBase } from '../../../../../efforless-base-component';
import { GDS } from '../../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-lsc-place-conversion',
  templateUrl: './lsc-place-conversion.component.html',
  styleUrls: ['./lsc-place-conversion.component.scss']
})
export class LscPlaceConversionComponent extends EffortlessComponentBase implements OnInit {


  sid: any;
  @Input() newSealNumber: number;
  @Input() componentDefList: any = [];
  @Input() componentList: any = [];
  @Input() logicCage: any;
  @Input() seal: any;
  @Input() replacement: any;
  newComponentDefList: any = [{}];
  newLogicCage: any = false;
  newSeal: any = {};



  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<LscPlaceConversionComponent>, private dialogService: NbDialogService) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }));
  }
  ngOnInit() {
    // console.error(this.newSealNumber)
    // console.error(this.replacement)

  }



  checkChange(event) {

  }



  // protected open(closeOnBackdropClick: boolean) {
  //this.dialogService.open(ReplaceWitnessesComponent, { closeOnBackdropClick });
  // }


//   finish() {
//     this.people.forEach(person => {
//       this.gds.editSealPayload.Witnesses.push(person);
//     });
//     this.gds.editSealsUpdated$.next(true);
//     this.dialogRef.close({
//       context: {
//         'newSealNumber': this.newSealNumber,
//         'replacement': this.replacement,
  
//       }
//     })

//   }
// }

finish() {
  let self = this;
  let addedSeal = { SealNumber: this.newSealNumber, ComponentLinks: [] };
  this.componentDefList.forEach(def => {
    if (def.Checked) {
      let checkedComponent: any = {};
      self.componentList.forEach(comp => {
        if (comp.Component == def.SlotComponentDefId) {
          checkedComponent = comp;
        }
      })
      addedSeal.ComponentLinks.push({ SealedComponents: checkedComponent.SlotComponentId });
    }
  });
  if (this.newLogicCage) {
    addedSeal.ComponentLinks.push({ SealedComponents: this.logicCage.SlotComponentId })
  }
  this.gds.editSealPayload.AddedSeals.push(addedSeal);//{SealNumber, ComponentLinks }
  this.gds.editSealsUpdated$.next(true);
  this.dialogRef.close({
    context: {
      'newComponentDefList': this.newComponentDefList,
      'newLogicCage': this.newLogicCage,
      'newSeal': this.newSeal,
      'newSealNumber': this.newSealNumber,
    }
  })
  this.dialogRef.close()
}

cancel() {
  this.dialogRef.close()
}

}
