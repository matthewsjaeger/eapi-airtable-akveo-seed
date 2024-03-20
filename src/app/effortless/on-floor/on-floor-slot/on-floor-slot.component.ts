import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { GDS } from '../../services/gds.service';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent, NbDialogService } from '@nebular/theme';


@Component({
  selector: 'ngx-on-floor-slot',
  templateUrl: './on-floor-slot.component.html',
  styleUrls: ['./on-floor-slot.component.scss']
})
export class OnFloorSlotComponent extends EffortlessComponentBase implements OnInit {
  search: any;
  slot: any = {};
  slots: any = {};
  sid: any;
  slotView: any;
  avaliableActions: any = '';
  Active: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, 
    protected menuService: NbMenuService, public route: ActivatedRoute, private dialogService: NbDialogService) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }));


  }

  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      let self = this
      let payload = self.gds.createPayload();
      payload.Slot = {};
      payload.Slot.SlotId = self.sid;
      console.error(self.gds);
      self.gds.smqUser.GetSlotViewDetails(payload).then(function (reply) {
        self.slot = reply.SlotView;
      });
    }));
  }

 

  // configureActions = function(){
  //   let self = this
  //   self.avaliableActions = {
  //     'emergencyDropInspection': false,
  //     'jpVerifyTenTwenty': false,
  //     'mediaVerification':false,
  //     'stackerFullRecord': false,
  //     'completeConversionLSC': false,
  //     'completeConversionMLC': false,
  //     'completeMoveToStorage': false,
  //     'editConversion': false,

  //   };

  //   switch(this.slot.WorkflowState){
  //     case 'Active':
  //       self.avaliableActions.emergencyDropInspection = true;
  //       self.avaliableActions.jpVerifyTenTwenty = true;
  //       self.avaliableActions.mediaVerification = true;
  //       self.avaliableActions.stackerFullRecord = true;
  //       self.avaliableActions.completeConversionLSC = true;
  //       self.avaliableActions.completeConversionMLC = true;
  //       self.avaliableActions.completeMoveToStorage = true;
  //       self.avaliableActions.editConversion = true;
  //       break;

  //     case 'RAM Cleared':
  //       self.avaliableActions.mediaVerification = true;

  //   }


  // }



  goBack() {
    this.router.navigateByUrl('effortless/on-floor/' + this.sid);
  }

  activateTournamentMode() {

  }

  cancelScheduledEvent() {

  }
  completeConversionLSC() {
    this.gds.stageMngr = { slot: this.sid, operation: 'lsc-conversion', stage: 'seals' };
    this.router.navigateByUrl('effortless/lsc-conversion/' +this.sid)
  }
  completeConversionMLC() {
    this.gds.stageMngr = { slot: this.sid, operation: 'mlc-conversion', stage: 'seals' };
    this.router.navigateByUrl('effortless/mlc-conversion/' + this.sid)
  }
  completeMoveToStorage(){
    this.router.navigateByUrl('effortless/complete-storage/' + this.sid);
  }
  deactivateTournamentMode() {

  }
  editSealGC() {

  }
  editSeals() {
    this.router.navigateByUrl('effortless/edit-seals/' + this.sid)
  }
  emergencyDropInspection() {
    this.router.navigateByUrl('effortless/emergency-drop-inspection/' + this.sid);
  }
  forensicFieldChecklist() {

  }
  gcInspection() {
    this.router.navigateByUrl('effortless/gc-inspection/' + this.sid)
  }
  jpVerify100K() {
    this.router.navigateByUrl('effortless/verify-onehundred-above/' + this.sid)
  }
  jpVerify10K() {
    this.router.navigateByUrl('effortless/verify-ten-twenty/' + this.sid)
  }
  jpVerify20K() {
    this.router.navigateByUrl('effortless/verify-twenty-fifty/' + this.sid)
  }
  jpVerify50K() {
    this.router.navigateByUrl('effortless/verify-fifty-onehundred/' + this.sid)
  }
  mediaVerification() {
    this.router.navigateByUrl('effortless/media-verification/' + this.sid)
  }
  preventativeMaintenance() {
    this.router.navigateByUrl('effortless/preventative-maintenance/' +this.sid)
  }

  ramClearToInspect() {

  }
  ramClearPerform() {

  }
  requestActivation() {
    this.router.navigateByUrl('effortless/request-activation/' + this.sid)
  }
  scheduleConversion() {
    this.router.navigateByUrl('effortless/schedule-conversion/' + this.sid);
  }
  scheduleMoveToStorage() {

  }
  scheduleTournament() {

  }
  stackerFullRecord() {
    this.router.navigateByUrl('effortless/stacker-full-record/' + this.sid)
  }
  stateOfMinnesotaInspection() {

    this.router.navigateByUrl('effortless/state-inspection/' + this.sid)
  }
  updateActiveSlot() {
    this.router.navigateByUrl('effortless/update-active-slot/' + this.sid)
  }

  completeConversionFloor() { }
  completeConversionFloorAdv() { }
  editConversionFloor() { }
  ramClearConversion() { }
  ramClearToActive() { }
 
  suspendedJPReverify100K() { }
  suspendedJPReverify10K() { }
  suspendedJPReverify20K() { }
  suspendedJPReverify50K() { }
  




}
