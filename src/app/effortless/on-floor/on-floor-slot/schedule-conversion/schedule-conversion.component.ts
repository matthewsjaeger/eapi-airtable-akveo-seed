import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-schedule-conversion',
  templateUrl: './schedule-conversion.component.html',
  styleUrls: ['./schedule-conversion.component.scss']
})
export class ScheduleConversionComponent extends EffortlessComponentBase implements OnInit {
  Slot: any = {};
  sid: any;
  isReady: boolean = false;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute) {
    super(gds, data, menuService)

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];
    }));

  }

  ngOnInit() {
    console.error('AAAAA');
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      console.error('BBBBB');

      let self = this
      let payload = self.gds.createPayload();
      payload.Slot = {};
      payload.Slot.SlotId = self.sid;
      console.error(self.gds);
      self.gds.smqUser.GetSlotViewDetails(payload).then(function (reply) {
        self.Slot = reply.SlotView;
        console.error(self.isReady);
        self.setBaseConversion(self);
        console.error(self.Slot);
        console.error(self.isReady);
      });
    }));
  }

  setBaseConversion(self) {
    self.Slot.Conversion = {};
    self.Slot.Conversion.Zone = self.Slot.Zone;
    self.Slot.Conversion.Address = self.Slot.Address;
    self.Slot.Conversion.SystemAddress = self.Slot.SystemAddress;
    self.Slot.Conversion.SlotLocation = self.Slot.SlotLocation;

    self.Slot.Conversion.SlotNumber = self.Slot.SlotNumber;
    self.Slot.Conversion.GameType = self.Slot.GameType;
    self.Slot.Conversion.TITO = self.Slot.TITO;
    self.Slot.Conversion.Bill = self.Slot.Bill;
    self.Slot.Conversion.Coin = self.Slot.Coin;
    self.Slot.Conversion.Tokenized = self.Slot.Tokenized;
    self.Slot.Conversion.EFTEnabled = self.Slot.EFTEnabled;

    self.Slot.Conversion.DOM = self.Slot.DOM;
    self.Slot.Conversion.LastAudited = self.Slot.LastAudited;
    self.Slot.Conversion.Version = self.Slot.Version;
    self.Slot.Conversion.CabinetModel = self.Slot.CabinetModel;
    self.Slot.Conversion.CabinetColor = self.Slot.CabinetColor;

    self.Slot.Conversion.DBAType = self.Slot.DBAType;
    self.Slot.Conversion.PrinterType = self.Slot.PrinterType;
    self.Slot.Conversion.CoinComparator = self.Slot.CoinComparator;
    self.Slot.Conversion.TypeCode = self.Slot.TypeCode;
    self.Slot.Conversion.DateOfDelivery = self.Slot.DateOfDelivery;
    self.Slot.Conversion.HSNEnabled = self.Slot.HSNEnabled;
    self.Slot.Conversion.Notes = self.Slot.Notes;
    self.Slot.Conversion.LinkNumber = self.Slot.LinkNumber;
    self.Slot.Conversion.DispositionApprovalDate = self.Slot.DispositionApprovalDate;
    self.Slot.Conversion.DispositionResolutionNumber = self.Slot.DispositionResolutionNumber;
    self.isReady = true;
  }

}
