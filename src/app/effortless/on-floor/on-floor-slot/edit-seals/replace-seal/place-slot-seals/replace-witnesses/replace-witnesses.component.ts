import { Component, OnInit, Input } from '@angular/core';
import { GDS } from '../../../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef } from '@nebular/theme';
import { PlaceSlotSealsComponent } from '../place-slot-seals.component';
import { EffortlessComponentBase } from '../../../../../../efforless-base-component';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'ngx-replace-witnesses',
  templateUrl: './replace-witnesses.component.html',
  styleUrls: ['./replace-witnesses.component.scss']
})
export class ReplaceWitnessesComponent extends EffortlessComponentBase implements OnInit {

  sid: any;
  witness: any;
  name: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, 
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<ReplaceWitnessesComponent>  ) { 
    super (gds, data, menuService) 

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];   
    }));
  }
  ngOnInit() {
  }

  finish(){

  }
  
  add(witness){
    console.error(this.witness);
    
  }
  

  cancelReplaceSeal(){
    this.dialogRef.close()
  }

}
