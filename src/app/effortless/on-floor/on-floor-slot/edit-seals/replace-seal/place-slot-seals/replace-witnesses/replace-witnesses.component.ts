import { Component, OnInit, Input } from '@angular/core';
import { GDS } from '../../../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef } from '@nebular/theme';
import { EffortlessComponentBase } from '../../../../../../efforless-base-component';

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
  people: any = [];
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

  finish() {
    this.people.forEach(person => {
      this.gds.editSealPayload.Witnesses.push(person.BadgeNumber);
    })
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
      if (reply.ErrorMessage) {
      alert(reply.ErrorMessage)
      } else{
      this.people.push(reply.Person);   
    }
    })
  }

  delete(wit) {
    this.people = this.people.filter(person => person.SecurityUserId != wit.SecurityUserId);
  }
  

  cancelReplaceSeal() {
    this.dialogRef.close()
  }

}
