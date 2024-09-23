import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-relicensing',
  templateUrl: './relicensing.component.html',
  styleUrls: ['./relicensing.component.scss']
})
export class RelicensingComponent extends EffortlessComponentBase implements OnInit {

  slots: any[] = [];
  rechecks: any[] = [];
  createFilteredSlots: any;
  BJProject: any;
  slotProject: any = '';
  pid: any;
  loading: boolean = false;
  searchTerm: string = '';


  constructor(public gds: GDS, public data: DataEndpoint, protected menuService: NbMenuService, public router: Router, public toastr: NbToastrService) {
    super(gds, data, menuService)


  }


  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      let self = this;
      this.reload(self);
    }));

  }

  searchSlots() {
    if (this.searchTerm.length < 1) {
      return;
    }
    let self = this;
    var payload = self.gds.createPayload();
    payload.SearchTerm = self.searchTerm;
    self.loading = true;
    self.gds.smqGamingAgent.RelicensingSearch(payload).then(function (reply) {
        self.loading = false;
        console.log(reply);
        if (reply.ErrorMessage) {
          self.toastr.danger(reply.ErrorMessage);
        } else if (reply.DisplayError) {
          self.toastr.danger(reply.DisplayError);
        } else {
          self.slots = reply.Slots;
        }
      }).catch(function (error) {
        self.toastr.warning(error);
        self.loading = false;
    });
  }

  reload(self) {
    var payload = self.gds.createPayload();
    this.loading = true;
    self.gds.smqGamingAgent.GetRelicensesToRecheck(payload).then(function (reply) {
      console.log(reply);
      self.loading = false;
      if (reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        self.rechecks = reply.Slots;
      }
    }).catch(function (error) {
      self.toastr.warning(error);
      self.loading = false;
    });
  }

  relicense(slot) {
    let self = this;
    var payload = self.gds.createPayload();
    payload.Slots = [slot];
    self.gds.smqGamingAgent.Relicense(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        self.searchTerm = '';
        self.reload(self);
      }
    });
  }

  relicenseAndRevisit(slot) {
    let self = this;
    var payload = self.gds.createPayload();
    slot.Recheck = true;
    payload.Slots = [slot];
    self.gds.smqGamingAgent.Relicense(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        self.searchTerm = '';
        self.reload(self);
      }
    });
  }

  unlicense(slot) {
    let self = this;
    var payload = self.gds.createPayload();
    payload.Slots = [slot];
    self.gds.smqGamingAgent.Unlicense(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        self.searchTerm = '';
        self.reload(self);
      }
    });
  }

  resolve(slot) {
    let self = this;
    var payload = self.gds.createPayload();
    payload.Slots = [slot];
    self.gds.smqGamingAgent.ResolveRecheck(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        self.searchTerm = '';
        self.reload(self);
      }
    });
  }

  goBack() {
    this.router.navigateByUrl('effortless/bj-atr');
  }

}
