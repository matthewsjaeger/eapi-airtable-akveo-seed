import { Component, OnInit, Input } from '@angular/core';
import { EffortlessComponentBase } from '../../../../../efforless-base-component';
import { GDS } from '../../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef, NbDialogService } from '@nebular/theme';
import { ReplaceSealComponent } from '../replace-seal.component';
import { ReplaceWitnessesComponent } from './replace-witnesses/replace-witnesses.component';

@Component({
  selector: 'ngx-place-slot-seals',
  templateUrl: './place-slot-seals.component.html',
  styleUrls: ['./place-slot-seals.component.scss']
})
export class PlaceSlotSealsComponent extends EffortlessComponentBase implements OnInit {
  
 
  sid: any;
  @Input() newSealNumber: number;
  @Input() componentDefList: any;
  @Input() logicCage: any;
  @Input() seal: any;
  @Input() replacement: any;
  newComponentDefList: any = [];
  newLogicCage: any = [];
  newSeal: any = [];

  

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, 
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<PlaceSlotSealsComponent>, private dialogService: NbDialogService ) { 
    super (gds, data, menuService) 

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];   
    }));
  }
  ngOnInit() {
    console.error(this.newSealNumber)
    console.error(this.replacement)
 
  }

  defListChecked(){
    
  }




    next(){

      this.dialogService.open(ReplaceWitnessesComponent, {
        context: {
          'newComponentDefList': this.newComponentDefList,
          'newLogicCage': this.newLogicCage,
          'newSeal': this.newSeal,
          'newSealNumber': this.newSealNumber,
               }
      })
    this.dialogRef.close()
  }

  cancelReplaceSeal(){
    this.dialogRef.close()
  }

}
