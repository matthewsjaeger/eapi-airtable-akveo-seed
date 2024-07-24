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
  matchingManufacturers: any = [];
  serialNumber: string = "";
  serialNumbers: any = [];
  manufacturer: string = "";
  fullManufacturer: any = {};
  searchTerm: string = "";
  noResults: boolean = false;
  emptyTerm: string = "";

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
          //self.slotPayload = self.gds.createPayload();
          //self.slotPayload.SlotView = { SerialNumber: "", Manufacturer: "", fullManufacturer: {}}
          self.loaded = true;
        }
      });
    }));
  }

  searchMan() {
    this.noResults = false;
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
      if (self.matchingManufacturers.length == 0) {
        self.emptyTerm = self.searchTerm;
        self.noResults = true;
      }
    });
  }

  setMan(man) {
    this.manufacturer = man.ManufacturerId;
    this.fullManufacturer = man;
  }

  unselectMan() {
    this.manufacturer = "";
    this.fullManufacturer = "";
  }

  addNum() {
    if (this.serialNumber) {
      let duplicate = false;
      let self = this;
      this.serialNumbers.forEach(function (num) {
        if (num.toLowerCase() == self.serialNumber.toLowerCase()) {
          self.toastr.warning(num + " already added to serial number list.")
          duplicate = true;
        }
      });
      if (!duplicate) {
        this.serialNumbers.push(this.serialNumber);
      }
    }
    this.serialNumber = "";
  }

  unselectNum(num) {
    for (let i = this.serialNumbers.length; i > 0; i--) {
      if (this.serialNumbers[i - 1] == num) {
        this.serialNumbers.splice(i - 1, 1);
        break;
      }
    }
  }

  createSlot() {
    let self = this;
    let payload = this.gds.createPayload();
    payload.SlotViews = [];
    this.serialNumbers.forEach(function (num) {
      payload.SlotViews.push({ SerialNumber: num, Manufacturer: self.manufacturer });
    });
    this.gds.smqSlotRepairAdmin.CreateSlot(payload).then(function (reply) {
      if(reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        self.toastr.success("Slots created.");
        self.router.navigateByUrl('effortless/create-actions');
      }
    });
  }
}
