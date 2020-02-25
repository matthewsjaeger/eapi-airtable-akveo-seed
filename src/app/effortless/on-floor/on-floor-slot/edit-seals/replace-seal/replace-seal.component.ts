import { Component, OnInit, Input } from '@angular/core';
import { GDS } from '../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef, NbDialogService } from '@nebular/theme';
import { AddSealComponent } from '../add-seal/add-seal.component';
import { EffortlessComponentBase } from '../../../../efforless-base-component';
import { PlaceSlotSealsComponent } from './place-slot-seals/place-slot-seals.component';

@Component({
  selector: 'ngx-replace-seal',
  templateUrl: './replace-seal.component.html',
  styleUrls: ['./replace-seal.component.scss']
})
export class ReplaceSealComponent extends EffortlessComponentBase implements OnInit {
  
  @Input() sid: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, 
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<ReplaceSealComponent>, private dialogService: NbDialogService ) { 
    super (gds, data, menuService) 

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];   
    }));

  } 
  ngOnInit() {
    console.error(this.sid)
  }

  cancelReplaceSeal(){
    this.dialogRef.close();
  }

  next(){
    this.dialogService.open(PlaceSlotSealsComponent, {
      context: {
        'sid': this.sid
      }
    })
  }

}
