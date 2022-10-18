import { Component, OnInit } from '@angular/core';
import { GDS } from '../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { ComponentMatchedComponent } from '../component-matched/component-matched.component';

@Component({
  selector: 'ngx-cdi-manual',
  templateUrl: './cdi-manual.component.html',
  styleUrls: ['./cdi-manual.component.scss']
})
export class CdiManualComponent extends EffortlessComponentBase implements OnInit {
  scds: any = [];
  displayCount: any = 10;
  loading: any = false;
  loadingPercent: any = 0;
  alertStatus: any = 'hide';
  alertMessage: any = '';

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
    this.gds.smqUser.GetUnmatchedManualComponents(payload).then(function (reply) {
      console.error('AAAAA', reply);
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      } else {
        self.scds = reply.WriteableSCDs;
      }
    });
  }

  more() {
    this.displayCount += 10;
  }

  matchComponent(scd) {
    let self = this;
    var payload = this.gds.createPayload();
    payload.WriteableSCD = scd;
    this.gds.smqUser.MatchManualComponent(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      } else {
        self.dialogService.open(ComponentMatchedComponent, {
          context: {
            'jur': reply.CDIHistory[0]
          }
        }).onClose.subscribe(resp => self.reload());
      }
    });
  }

  matchAll() {
    let self = this;
    var payload = this.gds.createPayload();
    this.runLoadingBar();
    this.gds.smqUser.MatchAllManualComponents(payload).then(function (reply) {
    });
  }

  sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  async runLoadingBar() {
    let self = this;
    this.loading = true;
    this.loadingPercent = 0;
    while (this.loadingPercent < 100) {
      await self.sleep(1500);
      self.loadingPercent++;
    }
    var payload = this.gds.createPayload();
    this.gds.smqUser.GetMatchAllResult(payload).then(function (reply) {
      self.loading = false;
      self.loadingPercent = 0;
      if (reply.ErrorMessage) {
        self.alertMessage = reply.ErrorMessage;
        self.alertStatus = 'danger';
      } else {
        self.alertMessage = reply.Reason;
        self.alertStatus = 'success';
      }
    });
  }

  onAlertClose() {
    this.alertMessage = '';
    this.alertStatus = 'hide';
  }
}
