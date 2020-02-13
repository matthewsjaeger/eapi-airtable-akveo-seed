import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GDS } from '../../../services/gds.service';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbListComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-stacker-full-record',
  templateUrl: './stacker-full-record.component.html',
  styleUrls: ['./stacker-full-record.component.scss']
})
export class StackerFullRecordComponent extends EffortlessComponentBase implements OnInit {

  checked = false;

  bills = [
    { value: 'N/A', label: 'N/A' },
    { value: 'Pass', label: 'Pass' },
    { value: 'Issue', label: 'Issue' },
    { value: 'Fail', label: 'Fail' },
  ];

  tickets = [
    { value: 'N/A', label: 'N/A' },
    { value: 'Pass', label: 'Pass' },
    { value: 'Issue', label: 'Issue' },
    { value: 'Fail', label: 'Fail' },
  ];

  cashOuts = [
    { value: 'N/A', label: 'N/A' },
    { value: 'Pass', label: 'Pass' },
    { value: 'Issue', label: 'Issue' },
    { value: 'Fail', label: 'Fail' },
  ];

  deficiencies = [
    { value: 'N/A', label: 'N/A' },
    { value: 'Pass', label: 'Pass' },
    { value: 'Issue', label: 'Issue' },
    { value: 'Fail', label: 'Fail' },
  ];

  books = [
    { value: 'N/A', label: 'N/A' },
    { value: 'Pass', label: 'Pass' },
    { value: 'Issue', label: 'Issue' },
    { value: 'Fail', label: 'Fail' },
  ];
  



  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, ) { 
    super (gds, data, menuService)

  }

  ngOnInit() {
  }

  toggle(checked: boolean) {
    this.checked = checked;
  }


}
