import { Component, OnInit } from '@angular/core';
import { GDS } from '../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';
import { EffortlessComponentBase } from '../../efforless-base-component';

@Component({
  selector: 'ngx-bj-table',
  templateUrl: './bj-table.component.html',
  styleUrls: ['./bj-table.component.scss']
})
export class BjTableComponent extends EffortlessComponentBase implements OnInit {
  BJTable: any = {};
  availableActions: any = {};

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, public toastr: NbToastrService, private dialogService: NbDialogService) {
    super(gds, data, menuService)

  }

  ngOnInit() {
    if (!this.gds || !this.gds.currentBJTables || this.gds.currentBJTables.length < 1) {
      this.router.navigateByUrl('effortless/search-tables');
    } else {
      this.BJTable = this.gds.currentBJTables[0];
      this.configureActions();
      console.error('asdf', this.BJTable);
    }
  }

  configureActions = function () {
    console.error('BBBBB', this.BJTable);
    this.availableActions = {
      'add': false
      , 'remove': false
      , 'scheduleTournament': false
      , 'activateTournament': false
      , 'modify': false
      , 'completeRemoval': false
      , 'completeModification': false
      , 'stopTournament': false
      , 'completeAdd': false
      , 'feltReview': false
      , 'logFeltChange': false
    };

    switch (this.BJTable.WorkflowState) {
      case 'In Play':
        this.availableActions.modify = true;
        this.availableActions.remove = true;
        this.availableActions.scheduleTournament = true;
        this.availableActions.logFeltChange = true;
        break;
      case 'Not In Play':
        this.availableActions.add = true;
        this.availableActions.modify = true;
        this.availableActions.scheduleTournament = true;
        break;
      case 'BJ Tournament Scheduled':
        this.availableActions.modify = true;
        this.availableActions.activateTournament = true;
        break;
      case 'Table Add Scheduled':
        this.availableActions.modify = true;
        this.availableActions.completeAdd = true;
        break;
      case 'Table Removal Scheduled':
        this.availableActions.completeRemoval = true;
        break;
      case 'Felt Review':
        this.availableActions.modify = true;
        this.availableActions.feltReview = true;
        break;
      case 'Table Modification Scheduled':
        this.availableActions.completeModification = true;
        break;
      case 'BJ Tournament Active':
        this.availableActions.stopTournament = true;
        break;
    }
  };

  scheduleTableModification(BJTable) {
    this.router.navigateByUrl('effortless/schedule-table-modification');
  }

  scheduleTableRemove() {
    this.router.navigateByUrl('effortless/schedule-table-remove')
  }

  scheduleBJTournament() {
    this.router.navigateByUrl('effortless/schedule-tournament')
  }
}
