import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-search-tables',
  templateUrl: './search-tables.component.html',
  styleUrls: ['./search-tables.component.scss']
})
export class SearchTablesComponent extends EffortlessComponentBase implements OnInit {
  searchTerm: any = '';
  BJTables: any = [];
  noResults: boolean = false;
  FilteredBJTablesList: any = [];


  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, public toastr: NbToastrService, private dialogService: NbDialogService) {
    super(gds, data, menuService)

  }

  ngOnInit() {
  }

  searchTables() {
    let self = this;
    if (this.searchTerm.trim().length > 0) {
      var payload = this.gds.createPayload();
      payload.SearchTerm = this.searchTerm;
      self.gds.smqUser.SearchBJTables(payload).then(function (reply) {
        if (reply.BJTables.length > 0) {
          self.BJTables = reply.BJTables;
          self.FilteredBJTablesList = self.createFilteredTables(reply.BJTables);
          self.noResults = false;
        } else {
          self.noResults = true;
          self.FilteredBJTablesList = [];
        }
      });
    } else {
      self.noResults = false;
      self.FilteredBJTablesList = [];
    }
  }

  createFilteredTables(tables) {
    var template =
      [
        { 'title': 'In Play', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Not In Play', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'BJ Tournament Scheduled', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Table Add Scheduled', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Table Removal Scheduled', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Felt Review', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Table Modification Scheduled', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'Purchased', 'BJTables': [], 'isVisible': true, 'selected': false }
        , { 'title': 'BJ Tournament Active', 'BJTables': [], 'isVisible': true, 'selected': false }
      ];
    template.forEach(function (list) {
      tables.forEach(function (table) {
        if (table.WorkflowState == list.title) {
          list.BJTables.push(table);
        }
      })
    });
    return this.sortTables(template);
  }

  sortTables(tableList) {
    var ret = [];
    let self = this;
    tableList.forEach(function (list) {
      if (list.BJTables.length > 0) {
        var newList = list;
        newList.BJTables = list.BJTables.sort(self.compareTableList);
        ret.push(list);
      }
    });
    return ret;
  }

  compareTableList(a, b) {
    if (a.PitTable < b.PitTable) {
      return -1;
    }
    if (a.PitTable > b.PitTable) {
      return 1;
    }
    return 0;
  }

  selectTable(BJTable) {
    this.gds.currentBJTables = [BJTable];
    this.router.navigateByUrl('effortless/bj-table');
  }

}
