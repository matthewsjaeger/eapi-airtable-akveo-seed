import { Component, OnInit, Output } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { AddSealComponent } from './add-seal/add-seal.component';
import { ReplaceSealComponent } from './replace-seal/replace-seal.component';
import { BreakSealComponent } from './break-seal/break-seal.component';

@Component({
  selector: 'ngx-edit-seal',
  templateUrl: './edit-seals.component.html',
  styleUrls: ['./edit-seals.component.scss']
})
export class EditSealsComponent extends EffortlessComponentBase implements OnInit {
  sid: any;
  slot: any;

  componentList: any;
  componentDefList: any;
  logicCage: any;
  seal: any;
  disabled: boolean;
  modifyDisabled: boolean = true;
  selected: string = null;
  
  @Output() newSealNumber: any;
  @Output() replacement: any;
  @Output() witness: any;



  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, private dialogService: NbDialogService) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }));

  }

  ngOnInit() {
    
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      let self = this
      let payload = self.gds.createPayload()
      payload.SearchTerm = self.sid
      self.gds.smqATR.GetInstalledComponents(payload).then(function (reply) {
        console.error(reply)
        self.componentDefList = reply.SlotComponentDefs
        self.logicCage = reply.SlotComponent
        self.seal = reply.SlotSeals
      });
    }))

  }

  cancel() {
    this.router.navigateByUrl('effortless/on-floor-slot/' + this.sid)
  }

  next() {
    this.router.navigateByUrl('effortless/edit-seals-logic-access/' + this.sid)
  }

  openAddSeal() {
    this.dialogService.open(AddSealComponent)

  }


  openReplaceSeal() {
    this.dialogService.open(ReplaceSealComponent, {
      context: {
        'componentDefList': this.componentDefList,
        'logicCage': this.logicCage,
        'seal': this.seal
      }

    })
  }

  openBreakSeal() {
    this.dialogService.open(BreakSealComponent)
  }

  enable(slotSealId) {
    this.modifyDisabled = !this.modifyDisabled;
    if (this.selected == slotSealId) {
      this.selected = null;
    } else {
      this.selected = slotSealId;
    } if (this.selected != null) {
      this.modifyDisabled = false;
    } else {
      this.modifyDisabled = true;
    }
  }

 

}