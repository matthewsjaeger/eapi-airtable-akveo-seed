import { Component, OnInit, Input } from '@angular/core';
import { GDS } from '../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { NbMenuService, NbDialogService, NbToastrService, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-component-matched',
  templateUrl: './component-matched.component.html',
  styleUrls: ['./component-matched.component.scss']
})
export class ComponentMatchedComponent extends EffortlessComponentBase implements OnInit {
  @Input() jur: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<ComponentMatchedComponent>, private dialogService: NbDialogService, public toastr: NbToastrService) {
    super(gds, data, menuService)

  }

  ngOnInit() {
    console.error('EEEE', this.jur);
    this.formatDates();
  }

  close() {
    this.dialogRef.close()
  }

  formatDates() {
    this.jur.formattedSubmitted = this.formatDate(this.jur.VendorSubmitted);
    this.jur.formattedCertified = this.formatDate(this.jur.TestLabCertified);
  }

  formatDate(dateString) {
    let date = new Date(dateString);
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset * 60 * 1000))
    return date.toISOString().split('T')[0]
  }

}


