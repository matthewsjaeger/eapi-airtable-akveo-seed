import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../efforless-base-component';
import { GDS } from '../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';
import { ComponentGeneratedComponent } from './component-generated/component-generated.component';
import { CdiStatusComponent } from '../cdi-status/cdi-status.component';

@Component({
  selector: 'ngx-cdi',
  templateUrl: './cdi.component.html',
  styleUrls: ['./cdi.component.scss']
})
export class CdiComponent extends EffortlessComponentBase implements OnInit {
  jurs: any = [];
  filteredJurs: any = [];
  days: any = 7;
  filter: string = "";
  searchAll: boolean = false;
  loading: boolean = false;
  timeout: boolean = false;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, public toastr: NbToastrService, private dialogService: NbDialogService) {
    super(gds, data, menuService)

  }

  ngOnInit() {
    let self = this;
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      self.reload();
    }));
  }

  reload() {
    let self = this;
    var payload = this.gds.createPayload();
    payload.Num = this.days;
    this.gds.smqATR.GetNewCDIs(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      }
      console.error("GetNewCDIs", reply);
      self.jurs = reply.CDIHistory;
      self.formatDates(self.jurs);
      self.filteredJurs = self.jurs;
    });
  }

  formatDates(jurs) {
    let self = this;
    jurs.forEach(jur => {
      jur.formattedSubmitted = self.formatDate(jur.VendorSubmitted);
      jur.formattedCertified = self.formatDate(jur.TestLabCertified);
    });
  }

  formatDate(dateString) {
    let date = new Date(dateString);
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset * 60 * 1000))
    return date.toISOString().split('T')[0]
  }

  generateComponent(jur) {
    let self = this;
    var payload = this.gds.createPayload();
    payload.CDIEntry = jur;
    console.error(jur);
    this.gds.smqATR.GenerateNewSlotCompDef(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      } else {
        self.dialogService.open(ComponentGeneratedComponent, {
          context: {
            'scd': reply.WriteableSCD
          }
        }).onClose.subscribe(resp => self.reload());
      }
    }); 
  }

  getStatus(jur) {
    let self = this;
    this.dialogService.open(CdiStatusComponent, {
      context: {
        'scd': jur
      }
    }).onClose.subscribe(resp => self.generateComponent(resp));
  }

  matchesFilter(jur) {
    let filter = this.filter;
    if (jur.ExpandedComponent.ComponentNumber.toLowerCase().includes(filter.toLowerCase())) {
      return true;
    } else if (jur.ExpandedComponent.ComponentName.toLowerCase().includes(filter.toLowerCase())) {
      return true;
    } else if (jur.ExpandedComponent.Version && jur.ExpandedComponent.Version.toLowerCase().includes(filter.toLowerCase())) {
      return true;
    } else if (jur.ExpandedComponent.ExpandedCertification.CertificationNumber.toLowerCase().includes(filter.toLowerCase())) {
      return true;
    } else if (jur.ExpandedComponent.DisplayVendor.toLowerCase().includes(filter.toLowerCase())) {
      return true;
    } else if (jur.ExpandedComponent.DisplaySignatures && jur.ExpandedComponent.DisplaySignatures.toLowerCase().includes(filter.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  filterJurs() {
    if (this.filter == "") {
      this.filteredJurs = this.jurs;
    } else {
      let self = this;
      this.filteredJurs = [];
      this.jurs.forEach(jur => {
        if (self.matchesFilter(jur)) {
          this.filteredJurs.push(jur);
        }
      });
    }
  }

  toggleSearchAll() {
    this.filter = "";
    this.timeout = false;
    this.searchAll = !this.searchAll;
    if (this.searchAll) {
      this.filteredJurs = [];
    } else {
      this.filterJurs();
    }
  }

  searchAllComponents() {
    let self = this;
    var payload = this.gds.createPayload();
    payload.SearchTerm = this.filter;
    self.loading = true;
    self.timeout = false;
    this.gds.smqATR.SearchCDIComponents(payload).then(function (reply) {
      self.loading = false;
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      } else {
        if (reply.CDIHistory != null) {
          self.formatDates(reply.CDIHistory);
          self.filteredJurs = reply.CDIHistory;
        }
      }
    }).catch(function (error) {
      self.loading = false;
      self.timeout = true;
    }); 
  }

  //openComponentGenerated(reply, self) {
  //  this.dialogService.open(ComponentGeneratedComponent, {
  //    context: {
  //      'scd': reply.WriteableSCD
  //    }
  //  }).onClose.subscribe(resp => self.reload());
  //}

}
