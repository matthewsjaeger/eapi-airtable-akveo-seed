import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../efforless-base-component';
import { GDS } from '../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-cdi',
  templateUrl: './cdi.component.html',
  styleUrls: ['./cdi.component.scss']
})
export class CdiComponent extends EffortlessComponentBase implements OnInit {
  jurs: any = [{}];

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute) {
    super(gds, data, menuService)

  }

  ngOnInit() {
    let self = this;
    console.error('aaa');
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      console.error('bbb');
      self.getStuff();
    }));
  }

  getStuff() {
    let self = this;
    var payload = this.gds.createPayload();
    payload.Num = 7;
    console.error(this.gds.smqATR);
    this.gds.smqATR.GetNewCDIs(payload).then(function (reply) {
      console.error("GetNewCDIs", reply);
      self.jurs = reply.CDIHistory;
    });
  }

  reload() {
    console.error(this.jurs);
  }

}
