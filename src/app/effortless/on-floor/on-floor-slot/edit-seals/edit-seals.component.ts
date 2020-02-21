import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { AddSealComponent } from './add-seal/add-seal.component';
import { ReplaceSealComponent } from './replace-seal/replace-seal.component';

@Component({
  selector: 'ngx-edit-seal',
  templateUrl: './edit-seals.component.html',
  styleUrls: ['./edit-seals.component.scss']
})
export class EditSealsComponent extends EffortlessComponentBase implements OnInit {
  sid: any;
  slot: any;

  componentList:any;
  componentDefList: any;


  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, 
    public route: ActivatedRoute, private dialogService: NbDialogService ) { 
    super (gds, data, menuService) 

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];   
    }));

  } 

  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready=>{
      let self = this
      let payload = self.gds.createPayload()
      payload.SearchTerm = self.sid
      self.gds.smqATR.GetInstalledComponents(payload).then(function (reply){
        console.error(reply)
        self.componentList = reply.SlotComponents
        self.componentDefList = reply.SlotComponentDefs
      })
    }))

  }

cancel(){
  this.router.navigateByUrl('effortless/on-floor-slot/' + this.sid)
}

next(){
  this.router.navigateByUrl('effortless/inspection-record/' + this.sid)
}

openAddSeal(){
  this.dialogService.open(AddSealComponent)

}

openReplaceSeal(){
  this.dialogService.open(ReplaceSealComponent)
}


}