import { Component, OnInit, Input } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { CdiStatusComponent } from '../../../cdi-status/cdi-status.component';

@Component({
  selector: 'ngx-conflicted-details',
  templateUrl: './conflicted-details.component.html',
  styleUrls: ['./conflicted-details.component.scss']
})
export class ConflictedDetailsComponent extends EffortlessComponentBase implements OnInit {
  @Input() scd: any;
  @Input() revokeable: boolean;
  expanded: boolean = false;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute,  public toastr: NbToastrService) {
    super(gds, data, menuService)

  }

  ngOnInit() {
    this.scd.formattedApprovalDate = this.formatDate(this.scd.ApprovalDate);
  }

  expand() {
    this.expanded = true;
  }

  contract() {
    this.expanded = false;
  }

  installedIn() {

  }

  revoke() {
    let self = this;
    let payload = this.gds.createPayload();
    payload.WriteableSCD = this.scd;
    this.gds.smqATR.RevokeConflictedComponent(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      }
      console.error("RevokeConflictedComponent", reply);
      self.gds.reload$.next({});
    });
  }

  formatDate(dateString) {
    let date = new Date(dateString);
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset * 60 * 1000))
    return date.toISOString().split('T')[0]
  }
}
