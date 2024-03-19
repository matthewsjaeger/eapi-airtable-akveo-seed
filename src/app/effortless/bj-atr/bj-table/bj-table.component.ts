import { Component, OnInit } from '@angular/core';
import { GDS } from '../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { CdiStatusComponent } from '../../cdi-status/cdi-status.component';
import { CompleteTableModificationComponent } from './complete-table-modification/complete-table-modification.component';
import { CompleteTableRemoveComponent } from './complete-table-remove/complete-table-remove.component';

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
    let self = this;
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      self.reload(self);
    }));
  }

  reload(self) {
    if (!self.gds || !self.gds.currentBJTables || self.gds.currentBJTables.length < 1) {
      self.router.navigateByUrl('effortless/search-tables');
    } else {
      console.error('EEEEE');
      self.BJTable = self.gds.currentBJTables[0];
      self.configureActions();
      console.error('asdf', self.BJTable);
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

  logFeltChange() {
    this.router.navigateByUrl('effortless/log-felt-change')
  }

  feltChangeChecklist() {
    this.router.navigateByUrl('effortless/felt-change-checklist')
  }

  back() {
    this.router.navigateByUrl('effortless/search-tables')
  }

  compareModification() {
    let self = this;
    this.dialogService.open(CompleteTableModificationComponent, {
      context: {
        'BJTable': self.BJTable
      }
    }).onClose.subscribe(resp => self.completeModification(resp));
  }

  completeModification(resp) {
    if (resp) {
      console.error('FFFFF');
      let self = this;
      this.reload(self);
    }
  }

  compareRemoval() {
    let self = this;
    this.dialogService.open(CompleteTableRemoveComponent, {
      context: {
        'BJTable': self.BJTable
      }
    }).onClose.subscribe(resp => self.completeRemoval(resp));
  }

  completeRemoval(resp) {
    if (resp) {
      console.error('GGGGG');
      let self = this;
      this.reload(self);
    }
  }
}
