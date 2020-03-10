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
  person: any;
  @Input() newSealNumber: number;
  @Input() newComponentDefList: any =[];
  @Input() newLogicCage: any =[];
  @Input() newSeal: any ;
  @Input() replacement: any;
  witnesses: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, 
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<ReplaceWitnessesComponent>  ) { 
    super (gds, data, menuService) 

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];   
    }));
  }
  ngOnInit() {
    // console.error("oldseal",this.newSeal)
    // console.error( "new seal #", this.newSealNumber)
    // console.error( "logic cage", this.newLogicCage)
    console.error("Def list", this.newComponentDefList)
  }

  finish(){
    this.dialogRef.close({
      context:{
        'newSealNumber': this.newSealNumber,
        'replacement': this.replacement,
        'witness': this.witness
      }
    })

  }
  
  add(){
    let payload = this.gds.createPayload();
    payload.SearchTerm = this.witnesses
    this.gds.smqUser.GetPersonByBadgeNumber(payload).then(reply =>{
      this.person = reply.Person
      this.witness = this.person.FirstName + ' ' + this.person.LastName + ', ' + this.person.SecurityUserId;
      this.witnesses = '';
      
    })
  }

  delete(){
    this.person = ''
  }
  

  cancelReplaceSeal(){
    this.dialogRef.close()
  }

}
