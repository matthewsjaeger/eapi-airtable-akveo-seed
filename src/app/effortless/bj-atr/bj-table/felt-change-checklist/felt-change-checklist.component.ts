import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-felt-change-checklist',
  templateUrl: './felt-change-checklist.component.html',
  styleUrls: ['./felt-change-checklist.component.scss']
})
export class FeltChangeChecklistComponent extends EffortlessComponentBase implements OnInit {
  BJTable: any = {};
  Checklist: any = {
    "HowManySpots": {}
    , 'SpotsCorrect': {}
    , 'HandFeeSpots': {}
    , 'PaysAtLeast': {}
    , 'InsurancePays': {}
    , 'OverUnder13': {}
    , 'CameraCoverageCorrect': {}
    , 'WhatAreTheCameraNumber': {}
    , 'TableInformationCorrect': {}
    , 'FeltInspectionCompliant': {}
    , 'Comments': {}};

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, public toastr: NbToastrService, private dialogService: NbDialogService) {
    super(gds, data, menuService)

  }

  ngOnInit() {
    if (!this.gds || !this.gds.currentBJTables || this.gds.currentBJTables.length < 1) {
      this.router.navigateByUrl('effortless/search-tables');
    } else {
      this.BJTable = this.gds.currentBJTables[0];
      this.BJTable.Checklist = {
        'SpotsCorrect': ''
        , 'HowManySpots': ''
        , 'HandFeeSpots': ''
        , 'PaysAtLeast': ''
        , 'InsurancePays': ''
        , 'OverUnder13': ''
        , 'CameraCoverageCorrect': ''
        , 'WhatAreTheCameraNumber': ''
        , 'TableInformationCorrect': ''
        , 'FeltInspectionCompliant': ''
        , 'Comments': ''
      };
      this.BJTable.ChecklistMetadata = { 'PercentComplete': 0, 'ComplianceStatus': 2, 'Status': 1 };
    }
  }

  updatePercentComplete = function () {
    console.log("Updating Percent Complete");
    this.BJTable.ChecklistMetadata.PercentComplete = 0;
    if (this.BJTable.Checklist.SpotsCorrect) this.BJTable.ChecklistMetadata.PercentComplete += 10;
    if (this.BJTable.Checklist.HowManySpots) this.BJTable.ChecklistMetadata.PercentComplete += 10;
    if (this.BJTable.Checklist.HandFeeSpots) this.BJTable.ChecklistMetadata.PercentComplete += 10;
    if (this.BJTable.Checklist.PaysAtLeast) this.BJTable.ChecklistMetadata.PercentComplete += 10;
    if (this.BJTable.Checklist.InsurancePays) this.BJTable.ChecklistMetadata.PercentComplete += 10;
    if (this.BJTable.Checklist.OverUnder13) this.BJTable.ChecklistMetadata.PercentComplete += 10;
    if (this.BJTable.Checklist.CameraCoverageCorrect) this.BJTable.ChecklistMetadata.PercentComplete += 10;
    if (this.BJTable.Checklist.WhatAreTheCameraNumber.length > 0) this.BJTable.ChecklistMetadata.PercentComplete += 10;
    if (this.BJTable.Checklist.TableInformationCorrect) this.BJTable.ChecklistMetadata.PercentComplete += 10;
    if (this.BJTable.Checklist.FeltInspectionCompliant) this.BJTable.ChecklistMetadata.PercentComplete += 10;

    this.BJTable.ChecklistMetadata.Status = (this.BJTable.ChecklistMetadata.PercentComplete == 100) ? 4 : 1;
    this.BJTable.ChecklistMetadata.ComplianceStatus = (!this.BJTable.Checklist.HowManySpots
      || this.BJTable.Checklist.WhatAreTheCameraNumber.length < 1 || this.BJTable.Checklist.FeltInspectionCompliant == 'Non-Compliant')
      ? 1 : (this.BJTable.ChecklistMetadata.PercentComplete == 100) ? 0 : 2;
  };

  applyToChecklist = function (question, answer) {
    let self = this;
    for (var feAnswer in this.Checklist[question]) {
      if (feAnswer != answer) {
        self.Checklist[question][feAnswer] = false;
      }
    }

    if (this.Checklist[question][answer]) {
      var fixedAnswer = answer;
      if (answer == 'NA') {
        fixedAnswer = 'N/A';
      } else if (answer == 'NonCompliant') {
        fixedAnswer = 'Non-Compliant';
      }
      self.BJTable.Checklist[question] = fixedAnswer;
    } else {
      self.BJTable.Checklist[question] = '';
    }

    this.updatePercentComplete();
  }

  confirm() {
    let self = this;
    let payload = self.gds.createPayload();
    payload.BJTables = [self.BJTable];
    console.error(payload);

    self.gds.smqBJFeltLog.ScheduleTableRemoval(payload).then(function (resp) {
      var payload2 = self.gds.createPayload();
      payload2.SearchTerm = self.BJTable.SerialNumber;
      self.gds.smqUser.SearchBJTables(payload2).then(function (resp) {
        self.gds.currentBJTables = resp.BJTables[0];
        self.router.navigateByUrl('effortless/bj-table');
      });
    })
  }

  back() {
    this.router.navigateByUrl('effortless/bj-table');
  }
}
