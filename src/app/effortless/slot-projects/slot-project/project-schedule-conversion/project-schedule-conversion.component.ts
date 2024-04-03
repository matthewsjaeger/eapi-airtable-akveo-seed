import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../../services/gds.service';
import { CsvDataService } from '../../../services/CsvData.service';

@Component({
  selector: 'ngx-project-schedule-conversion',
  templateUrl: './project-schedule-conversion.component.html',
  styleUrls: ['./project-schedule-conversion.component.scss']
})
export class ProjectScheduleConversionComponent extends EffortlessComponentBase implements OnInit {
  slots: any = [];
  project: any = {};
  readOnly: any = ['SerialNumber', 'BarcodeData']

  constructor(private router: Router, protected menuService: NbMenuService, public data: DataEndpoint, public gds: GDS, public route: ActivatedRoute,
    private csvService: CsvDataService) {
    super(gds, data, menuService)


  }

  ngOnInit() {
    let self = this;
    this.safeSubscribe(this.gds.onReady().subscribe(ready => {
      if (self.gds.slotList && self.gds.slotList.length > 0) {
        self.slots = self.gds.slotList;
      } else {
        self.router.navigateByUrl('effortless/slot-projects');
      }
    }));
  }

  saveAsCSV() {
    let sheet = [];
    this.slots.forEach(function (slot) {
      let row = {
        SerialNumber: slot.SerialNumber,
        Barcode: slot.BarcodeData,
        "": "",
        Zone: slot.Zone,
        Address: slot.Address,
        SystemAddress:  slot.SystemAddress,
        Location: slot.slotLocation,

        SlotNumber:  slot.SlotNumber,
        GameType: slot.GameType,
        GameName: slot.GameName,
        TITO: slot.TITO,
        Bill: slot.Bill,
        Coin: slot.Coin,
        Tokenized: slot.Tokenized,
        EFTEnabled:  slot.EFTEnabled,

        DOM: slot.DOM,
        LastAudited:  slot.LastAudited,
        Version: slot.Version,
        CabinetModel:  slot.CabinetModel,
        CabinetColor:  slot.CabinetColor,

        DBAType: slot.U01,
        PrinterType: slot.U02,
        CoinComparator: slot.U03,
        TypeCode: slot.U04,
        DateOfDelivery: slot.U05,
        HSNEnabled: slot.U06,
        Notes: slot.U10,
        LinkNumber: slot.U18,
        DispositionApprovalDate: slot.U22,
        DispositionResolutionNumber: slot.U23,
      }
      sheet.push(row);
    });

    //var bla = [['asdf', 'gda', 'qwer'], ['zxcv', 'bvc', 'mnb']];
    console.error(sheet);
    this.csvService.exportToCsv('test.csv', sheet);
  }

  public changeListener(files: FileList) {
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        let csva: any = [];
        console.log(csv);
        csva = csv.split(/\r?\n/);
        console.error(csva);
      }
    }
  }

}
