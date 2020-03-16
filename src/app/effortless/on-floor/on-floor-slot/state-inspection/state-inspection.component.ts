import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-state-inspection',
  templateUrl: './state-inspection.component.html',
  styleUrls: ['./state-inspection.component.scss']
})
export class StateInspectionComponent extends EffortlessComponentBase implements OnInit {

  checklist: any = {
    StateRepresentative: '', GamingRepresentative: '', Visit: '', InformationRequested: '', Comments: '',

  }

  sid: any;
  checklistMetadata: any;
  state: any;
  personState: any;
  gaming: any;
  personGaming: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }));

  }

  ngOnInit() {
  }

  addState(){
    let payload = this.gds.createPayload();
    payload.SearchTerm = this.state
    this.gds.smqUser.GetPersonByBadgeNumber(payload).then(reply =>{
      this.personState = reply.Person
      this.checklist.StateRepresentative = this.personState.FirstName + ' ' + this.personState.LastName + ', ' + this.personState.SecurityUserId;
      this.state = '';
    })
  }

  deleteState(){
    this.personState = ''
   }

   addGaming(){
    let payload = this.gds.createPayload();
    payload.SearchTerm = this.gaming
    this.gds.smqUser.GetPersonByBadgeNumber(payload).then(reply =>{
      this.personGaming = reply.Person
      this.checklist.GamingRepresentative = this.personGaming.FirstName + ' ' + this.personGaming.LastName + ', ' + this.personGaming.SecurityUserId;
      this.gaming = '';
    })
  }

  deleteGaming(){
    this.personGaming = ''
   }

  updatePercentComplete = function () {
    this.checklistMetadata.PercentComplete = 0;
    if (this.checklist.StateRepresentative) this.checklistMetadata.PercentComplete += 60;
    if (this.checklist.GamingRepresentative) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.Visit) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.InformationRequested) this.checklistMetadata.PercentComplete += 10;
    if (this.checklist.Comments) this.checklistMetadata.PercentComplete += 10;

    this.checklistMetadata.Status = (this.checklistMetadata.PercentComplete == 100) ? 4 : 1;
    this.checklistMetadata.ComplianceStatus = (this.checklist.StateRepresentative) || (this.checklist.GamingRepresentative) ||
      (this.checklist.Visit)
      ? 1 : (this.checklistMetadata.PercentComplete == 100) ? 0 : 2;
  };


  finish() {
    let self = this;
    this.updatePercentComplete();
    let payload = this.gds.createPayload();
    console.error(this.sid);
    payload.SlotView = { SlotId: this.sid, Checklist: this.checklist, ChecklistMetadata: this.checklistMetadata };
    this.gds.smqGamingAgent.StateOfMinnesotaInspection(payload).then(resp => {
      if (!resp.ErrorMessage) {
        this.router.navigateByUrl('effortless/on-floor-slot/' + self.sid);
      }
    });
  }

  cancel() {
    let self = this
    this.router.navigateByUrl('effortless/on-floor-slot/' + self.sid)
  }

}
