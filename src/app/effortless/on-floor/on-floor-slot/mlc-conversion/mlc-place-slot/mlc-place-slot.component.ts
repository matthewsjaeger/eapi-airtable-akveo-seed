import { Component, OnInit, Output } from '@angular/core';
import { EffortlessComponentBase } from '../../../../efforless-base-component';
import { GDS } from '../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';

import { EventEmitter } from 'events';
import { MlcAddComponent } from './mlc-add/mlc-add.component';
import { MlcReplaceComponent } from './mlc-replace/mlc-replace.component';
import { MlcBreakComponent } from './mlc-break/mlc-break.component';

@Component({
  selector: 'ngx-mlc-place-slot',
  templateUrl: './mlc-place-slot.component.html',
  styleUrls: ['./mlc-place-slot.component.scss']
})
export class MlcPlaceSlotComponent extends EffortlessComponentBase implements OnInit {
  sid: any;
  slot: any;

  componentList: any;
  componentDefList: any;
  logicCage: any;
  seals: any = [];
  originalSeals: any = [];
  disabled: boolean;
  modifyDisabled: boolean = true;
  selected: string = null;
  unsealedComponents: any = [{}];

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
        self.seals = reply.SlotSeals
        self.originalSeals = Object.assign([], reply.SlotSeals);
        self.filterSealedComponents();
        self.populateDescriptions();
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
    
    this.dialogService.open(MlcAddComponent, {
      context: {
        'componentDefList': this.componentDefList,
        'componentList': this.componentList,
        'logicCage': this.logicCage,
      }
    })
  }

  

  openReplaceSeal() {
    
    let replacedSeal: any = {};
    this.seals.forEach(specificSeal => {
      if (specificSeal.SlotSealId == this.selected) {
        replacedSeal = specificSeal;
        console.error("replaced seal");
        console.error(replacedSeal);
      }
    });
    this.dialogService.open(MlcReplaceComponent, {
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
    this.seals.forEach(specificSeal =>{
      if (specificSeal.SlotSealId == this.selected){
        brokenSeal = specificSeal;
      }
    })
   
    this.dialogService.open(MlcBreakComponent,{
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
      console.error(this.originalSeals);
      console.error(this.gds.editSealPayload.AddedSeals);
      let newList = Object.assign([], this.originalSeals);
      this.gds.editSealPayload.AddedSeals.forEach(addedSeal => {
        newList.push(addedSeal);
      });
      this.gds.editSealPayload.BrokenSeals.forEach(brokenSeal => {
        newList = newList.filter(seal => seal.SealNumber != brokenSeal.SealNumber);
      });
      this.seals = newList;
      this.selected = null;
      this.modifyDisabled = true;
      this.filterSealedComponents();
      this.populateDescriptions();
    }
  }

  filterSealedComponents() {
    let self = this;
    this.unsealedComponents = Object.assign([], this.componentDefList);
    this.unsealedComponents.push({ ToStringText: 'Logic Cage', SlotComponentDefId: this.logicCage.OtherComponentType });
    this.seals.forEach(seal => {
      seal.ComponentLinks.forEach(link => {
        this.unsealedComponents.forEach(unsealedComponent => {
          if (this.getComponentId(unsealedComponent.SlotComponentDefId) == link.SealedComponents) {
            this.unsealedComponents = this.unsealedComponents.filter(comp => comp.SlotComponentDefId != unsealedComponent.SlotComponentDefId);
          }
        });
      });
    });
  }

  getComponentId(componentDefId) {
    let ret = '';
    if (componentDefId == this.logicCage.OtherComponentType) {
      ret = this.logicCage.SlotComponentId;
    }
    this.componentList.forEach(comp => {
      if (componentDefId == comp.Component) {
        ret =  comp.SlotComponentId;
      }
    });
    return ret;
  }

  getDescription(link) {
    if (link.SealedComponents == this.logicCage.SlotComponentId) {
      link.Description = "Logic Cage";
    } else {
      this.componentDefList.forEach(def => {
        if (link.SealedComponents == this.getComponentId(def.SlotComponentDefId)) {
          link.Description = def.ToStringText;
        }
      });
    }
  }

  populateDescriptions() {
    this.seals.forEach(seal => {
      seal.ComponentLinks.forEach(link => {
        this.getDescription(link);
      })
    });
  }





}
