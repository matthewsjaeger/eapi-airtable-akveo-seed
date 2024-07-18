import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../services/gds.service';

@Component({
  selector: 'ngx-create-slot',
  templateUrl: './create-slot.component.html',
  styleUrls: ['./create-slot.component.scss']
})
export class CreateSlotComponent extends EffortlessComponentBase implements OnInit {
  loaded: boolean = false;
  manufacturers: any = [];
  slotPayload: any = {};
  matchingManufacturers: any = [];
  searchTerm: string = "";

  constructor(private router: Router, protected menuService: NbMenuService, public data: DataEndpoint, public gds: GDS, public route: ActivatedRoute,
    public toastr: NbToastrService, private dialogService: NbDialogService) {
    super(gds, data, menuService)

  }

  ngOnInit() {
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      let self = this
      let payload = self.gds.createPayload();
      self.gds.smqATR.GetManufacturerList(payload).then(function (reply) {
        if (reply.ErrorMessage) {
          self.toastr.danger(reply.ErrorMessage);
        } else {
          self.manufacturers = reply.Manufacturers
          console.error(self.manufacturers);
          self.slotPayload = self.gds.createPayload();
          self.slotPayload.SlotView = { SerialNumber: "", Manufacturer: "", fullManufacturer: {}}
          self.loaded = true;
        }
      });
    }));
  }

  searchMan() {
    if (this.searchTerm == "") {
      this.matchingManufacturers = [];
      return;
    }
    let self = this;
    this.matchingManufacturers = [];
    this.manufacturers.forEach(function (man) {
      if (man.Description.toLowerCase().includes(self.searchTerm.toLowerCase())) {
        self.matchingManufacturers.push(man);
      }
    });
  }

  setMan(man) {
    this.slotPayload.SlotView.Manufacturer = man.ManufacturerId;
    this.slotPayload.SlotView.fullManufacturer = man;
  }

  unselectMan() {
    this.slotPayload.SlotView.Manufacturer = "";
    this.slotPayload.SlotView.fullManufacturer = "";
  }
}
