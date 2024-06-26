import { Component, OnInit } from '@angular/core';
import { GDS } from '../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogService } from '@nebular/theme';
import { EffortlessComponentBase } from '../../../../efforless-base-component';

@Component({
  selector: 'ngx-edit-seals-logic-access',
  templateUrl: './edit-seals-logic-access.component.html',
  styleUrls: ['./edit-seals-logic-access.component.scss']
})
export class EditSealsLogicAccessComponent extends EffortlessComponentBase implements OnInit {

  today= new Date();

  checklist: any = {
    WorkPerformed: '', SecurityRepresentative: ''
  };
  checklistMetadata: any = {};
  accessReason: any = "";
  timeAccessed: any = "";
  sid: any;
  context: any;
  slot: any;
  security: any;
  personSecurity: any;
  user: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
      this.context = params['context'];
    }));

  }

  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      let self = this
      let payload = self.gds.createPayload();
      payload.Slot = {};
      payload.Slot.SlotId = self.sid;
      self.gds.smqUser.GetSlotViewDetails(payload).then(function (reply) {
        self.slot = reply.SlotView;
        self.user = reply.GAINSUser
        console.error(reply)
      });
    }));
  }

  addSecurity() {
    let payload = this.gds.createPayload();
    payload.SearchTerm = this.security
    this.gds.smqUser.GetPersonByBadgeNumber(payload).then(reply => {
      this.personSecurity = reply.Person
      this.checklist.SecurityRepresentative = this.personSecurity.FirstName + ' ' + this.personSecurity.LastName + ', ' + this.personSecurity.SecurityUserId;
      this.security = '';
    })
  }

  delete() {
    this.personSecurity = ''
  }


  updatePercentComplete = function () {
    this.checklistMetadata.PercentComplete = 0;
    if (this.checklist.WorkPerformed) this.checklistMetadata.PercentComplete += 50;
    if (this.checklist.SecurityRepresentative) this.checklistMetadata.PercentComplete += 50;
    this.checklistMetadata.Status = (this.checklistMetadata.PercentComplete == 100) ? 4 : 1;
    this.checklistMetadata.ComplianceStatus = (!this.checklist.WorkPerformed || !this.checklist.SecurityRepresentative) ? 1 :
      (this.checklistMetadata.PercentComplete == 100) ? 0 : 2;
  };

  finish() {
    let self = this;
    this.updatePercentComplete();
    if (this.context = 'mlc-conversion') {
      this.gds.stageMngr = { slot: this.sid, operation: 'mlc-conversion', stage: 'checklist' };
      this.gds.editSealPayload.LogicAccess = { AccessDate: this.timeAccessed, Reason: this.accessReason };
      this.gds.editSealPayload.LogicAccessChecklist = this.checklist;
      this.gds.editSealPayload.LogicAccessMetaData = this.checklistMetadata;
      this.router.navigateByUrl('effortless/mlc-conversion/' + self.sid);
    } else if (this.context = 'lsc-conversion') {
      this.gds.stageMngr = { slot: this.sid, operation: 'lsc-conversion', stage: 'checklist' };
      this.gds.editSealPayload.LogicAccess = { AccessDate: this.timeAccessed, Reason: this.accessReason };
      this.gds.editSealPayload.LogicAccessChecklist = this.checklist;
      this.gds.editSealPayload.LogicAccessMetaData = this.checklistMetadata;
      this.router.navigateByUrl('effortless/lsc-conversion/' + self.sid);
    } else {
      let payload = this.gds.createPayload();
      payload.SlotView = { SlotId: this.sid, Checklist: this.checklist, ChecklistMetadata: this.checklistMetadata };
      payload.Witnesses = this.gds.editSealPayload.Witnesses;
      payload.LogicAccess = { AccessDate: this.timeAccessed, Reason: this.accessReason };
      payload.BrokenSeals = this.gds.editSealPayload.BrokenSeals;
      payload.AddedSeals = this.gds.editSealPayload.AddedSeals;
      this.gds.smqSlotRepairAdmin.EditSeals(payload).then(resp => {
        if (!resp.ErrorMessage) {
          this.gds.editSealPayload = {
            SlotView: {},
            Witnesses: [],
            LogicAccess: {},
            BrokenSeals: [],
            AddedSeals: []
          }
          this.router.navigateByUrl('effortless/on-floor-slot/' + self.sid);
        }
      });
    }
  }

  cancel() {
    this.gds.stageMngr = { slot: '', operation: '', stage: '' };
    this.gds.editSealPayload = {
      SlotView: {},
      Witnesses: [],
      LogicAccess: {},
      BrokenSeals: [],
      AddedSeals: []
    }
    this.router.navigateByUrl('effortless/on-floor-slot/' + this.sid);
  }

}
