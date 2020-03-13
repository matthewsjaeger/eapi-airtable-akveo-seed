import { Component, OnInit, Output } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { AddSealComponent } from './add-seal/add-seal.component';
import { ReplaceSealComponent } from './replace-seal/replace-seal.component';
import { BreakSealComponent } from './break-seal/break-seal.component';
import { EventEmitter } from 'events';

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
  originalSeals: any;
  disabled: boolean;
  modifyDisabled: boolean = true;
  selected: string = null;

  @Output() newSealNumber = new EventEmitter();
  @Output() replacement: any;
  @Output() witness: any;



  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, private dialogService: NbDialogService) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }));

    this.safeSubscribe(this.gds.editSealsUpdated$.subscribe(updated => {
      this.generateNewSealsList();
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
        self.componentList = reply.SlotComponents;
        self.logicCage = reply.SlotComponent
        self.seal = reply.SlotSeals
        self.originalSeals = reply.SlotSeals;
      });
    }))
    this.createGDSPayload();

  }


  cancel() {
    this.router.navigateByUrl('effortless/on-floor-slot/' + this.sid)
  }

  next() {
    this.router.navigateByUrl('effortless/edit-seals-logic-access/' + this.sid)
  }


 
  openAddSeal() {
    
    this.dialogService.open(AddSealComponent, {
      context: {
        'componentDefList': this.componentDefList,
        'componentList': this.componentList,
        'logicCage': this.logicCage,
      }
    })
  }

  

  openReplaceSeal() {
    
    let replacedSeal: any = {};
    this.seal.forEach(specificSeal => {
      if (specificSeal.SlotSealId == this.selected) {
        replacedSeal = specificSeal;
        console.error("replaced seal");
        console.error(replacedSeal);
      }
    });
    console.log('AAAAA');
    console.log()
    this.dialogService.open(ReplaceSealComponent, {
      context: {
        'componentDefList': this.componentDefList,
        'componentList': this.componentList,
        'logicCage': this.logicCage,
        'seal': replacedSeal
      }

    })
  }

 

  openBreakSeal() {

    let brokenSeal: any={};
    this.seal.forEach(specificSeal =>{
      if (specificSeal.SlotSealId == this.selected){
        brokenSeal = specificSeal;
      }
    })
   
    this.dialogService.open(BreakSealComponent,{
      context: {
        'seal': brokenSeal
      }
    })

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

  createGDSPayload() {
    this.gds.editSealPayload = {
      SlotView: {},
      Witnesses: [],
      LogicAccess: {},
      BrokenSeals: [],
      AddedSeals: []
    }
  }

  generateNewSealsList() {
    if (this.gds.editSealPayload) {
      let newList = this.originalSeals;
      this.gds.editSealPayload.AddedSeals.forEach(addedSeal => {
        console.error("adding seal");
        console.error(addedSeal);
        newList.push(addedSeal);
      });
      this.gds.editSealPayload.BrokenSeals.forEach(brokenSeal => {
        console.error("removing seal");
        console.error(brokenSeal);
        newList = newList.filter(seal => seal.SealNumber != brokenSeal.SealNumber);
      });
      console.error("new list");
      console.error(newList);
      this.seal = newList;
      this.selected = null;
      this.modifyDisabled = true;
    }
  }





}
