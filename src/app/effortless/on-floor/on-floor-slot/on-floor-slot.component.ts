import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { GDS } from '../../services/gds.service';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent } from '@nebular/theme';


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

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute) {
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

  preventativeMaintenance() {
    this.router.navigateByUrl('effortless/preventative-maintenance')
  }

  activateTournamentMode() {

  }

  cancelScheduledEvent() {

  }
  editSealGC() {

  }
  editSeals() {

  }
  editSealsAdmin() {

  }
  emergencyDropInspection() {
    this.router.navigateByUrl('effortless/emergency-drop-inspection/' + this.sid);
  }
  forensicFieldChecklist() {

  }
  gcInspection() {

  }
  jpVerify100K() {

  }
  jpVerify10K() {
    this.router.navigateByUrl('effortless/verify-ten-twenty/' + this.sid)
  }
  jpVerify20K() {

  }
  jpVerify50K() {

  }
  mediaVerification() {
    this.router.navigateByUrl('effortless/media-verification/' + this.sid)
  }
  quickCorrection() {

  }
  ramClearPerform() {

  }
  scheduleConversions() {

  }
  scheduleMoveToStorage() {

  }
  scheduleTournament() {

  }
  stackerFullNotification() {

  }
  stackerFullRecord() {
    this.router.navigateByUrl('effortless/stacker-full-record/' + this.sid)
  }
  stateOfMinnesotaInspection() {

    this.router.navigateByUrl('effortless/preventative-maintenance/' + this.sid)
  }
  updateActiveSlot() {

  }
  completeConversionFloor() { }
  completeConversionFloorAdv() { }
  editConversionFloor() { }
  ramClearConversion() { }
  ramClearToInspect() { }
  ramClearToActive() { }
  requestActivation() { }
  suspendedJPReverify100K() { }
  suspendedJPReverify10K() { }
  suspendedJPReverify20K() { }
  suspendedJPReverify50K() { }
  deactivateTournamentMode() { }




}
