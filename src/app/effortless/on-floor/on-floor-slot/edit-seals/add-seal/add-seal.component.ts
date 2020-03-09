import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbMenuService, NbDialogRef } from '@nebular/theme';
import { GDS } from '../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { EffortlessComponentBase } from '../../../../efforless-base-component';

@Component({
  selector: 'ngx-add-seal',
  templateUrl: './add-seal.component.html',
  styleUrls: ['./add-seal.component.scss']
})
export class AddSealComponent extends EffortlessComponentBase implements OnInit {
  sid:any;
  seal: any;
  seals: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, 
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<AddSealComponent> ) { 
    super (gds, data, menuService) 

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];   
    }));

  } 

  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      let self = this
      let payload = self.gds.createPayload()
      payload.SearchTerm = self.seals
      self.gds.smqATR.GetInstalledComponents(payload).then(function (reply) {
        console.error(reply)
        self.seal = reply.SlotSeals
        
      });
    }))
  
  }

  cancelAddSeal(){
    this.dialogRef.close()
  }

  next(){}
   
}
