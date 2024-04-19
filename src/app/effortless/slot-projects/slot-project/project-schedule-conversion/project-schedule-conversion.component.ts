import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { NbMenuService, NbDialogService, NbToastrService } from '@nebular/theme';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../../services/gds.service';
import { ResolveComponentAmbiguityComponent } from './resolve-component-ambiguity/resolve-component-ambiguity.component';
import { ResolveReadOnlyComponent } from './resolve-read-only/resolve-read-only.component';

@Component({
  selector: 'ngx-project-schedule-conversion',
  templateUrl: './project-schedule-conversion.component.html',
  styleUrls: ['./project-schedule-conversion.component.scss']
})
export class ProjectScheduleConversionComponent extends EffortlessComponentBase implements OnInit {
  slots: any = [];
  project: any = {};
  readOnly: any = ['SerialNumber', 'BarcodeData']
  changes: any = [];
  loading: boolean = false;
  complete: boolean = false;

  constructor(private router: Router, protected menuService: NbMenuService, public data: DataEndpoint, public gds: GDS,
    public route: ActivatedRoute, private dialogService: NbDialogService, public toastr: NbToastrService) {
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

  saveAsCSVOld() {
    let sheet = [];
    this.slots.forEach(function (slot) {
      let row = {
        SerialNumber: slot.SerialNumber,
        Barcode: slot.BarcodeData,
        "": "",
        Zone: slot.Zone,
        Address: slot.Address,
        SystemAddress: slot.SystemAddress,
        Location: slot.slotLocation,

        SlotNumber: slot.SlotNumber,
        GameType: slot.GameType,
        GameName: slot.GameName,
        TITO: slot.TITO,
        Bill: slot.Bill,
        Coin: slot.Coin,
        Tokenized: slot.Tokenized,
        EFTEnabled: slot.EFTEnabled,

        DOM: slot.DOM,
        LastAudited: slot.LastAudited,
        Version: slot.Version,
        CabinetModel: slot.CabinetModel,
        CabinetColor: slot.CabinetColor,

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
    //this.csvService.exportToCsv('test.csv', sheet);
  }

  saveAsCSV() {
    let self = this;
    let payload = self.gds.createPayload();
    payload.SlotViews = this.slots;
    self.gds.smqSlotRepairAdmin.ScheduleConversionWrite(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        console.error('TTTT', reply.ErrorMessage);
      } else {
        self.writeFile(reply.SearchTerm, "test.csv");
      }
    });
  }

  writeFile(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  public changeListener(event) {
    const files: FileList = event.target.files
    let self = this;
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        console.log(csv);
        let payload = self.gds.createPayload();
        payload.SearchTerm = csv;
        self.loading = true;
        self.gds.smqSlotRepairAdmin.ScheduleConversionRead(payload).then(function (reply) {
          self.loading = false;
          if (reply.ErrorMessage) {
            console.error('VVVVV', reply.ErrorMessage);
          } else {
            console.error(reply);
            self.changes = reply.ChangeSummary.Changes;
            self.checkForAmbiguities(self);
            //self.handleAmbiguities(self.changes, self);
          }
        }).catch(function (error) {
          console.error(error);
          self.loading = false;
        });;
      }
      event.target.value = null;
    }
  }
  handleAmbiguities(changes, self) {
    console.error('SSSSS', changes);
    changes.forEach(function (change) {
      if (change.Ambiguous) {
        change.Changes.forEach(function (fieldChange) {
          if (fieldChange.Comps.length > 0) {
            self.resolveAmbiguity(change.Description, fieldChange.Comps);
          }
        });
      }
    });
  }

  resolveAmbiguity(change, fieldChange) {
    var scds = fieldChange.Comps;
    if (!scds || scds.length < 1) {
      if (fieldChange.Error) {
        this.resolveReadOnly(change, fieldChange);
      }
      return;
    }
    let self = this;
    this.dialogService.open(ResolveComponentAmbiguityComponent, {
      context: {
        'scds': fieldChange.Comps,
        'slot': change.Description
      }
    }).onClose.subscribe(resp => self.resolveComponent(resp, change, fieldChange, self));
  }

  resolveComponent(resp, change, fieldChange, self) {
    if (resp) {
      change.Ambiguous = false;
      fieldChange.New = resp.SimplifiedDisplayText;
      self.checkForAmbiguities(self);
    }
  }

  checkForAmbiguities(self) {
    let resolved = true;
    self.changes.forEach(function (change) {
      if (change.Ambiguous || change.Errors) {
        resolved = false;
      }
    });
    if (resolved) {
      self.complete = true;
    }
  }

  resolveReadOnly(change, fieldChange) {
    let self = this;
    this.dialogService.open(ResolveReadOnlyComponent, {
      context: {
        'message': 'Revert to previous value?'
      }
    }).onClose.subscribe(resp => self.finishReadOnly(resp, change, fieldChange, self));
  }

  finishReadOnly(resp, change, fieldChange, self) {
    if (resp) {
      var i = change.Changes.length;
      let resolved = true;
      console.error(change);
      console.error(fieldChange);
      while (i--) {
        console.error(i);
        if (change.Changes[i].Field == fieldChange.Field) {
          change.Changes.splice(i, 1);
        } else {
          if (change.Changes[i].Error) {
            resolved = false;
          }
        }
      }
      if (resolved) {
        change.Errors = false;
      }
      self.checkForAmbiguities(self);
    }
  }

  confirmSchedule() {
    this.toastr.warning("Working on confirm backend.");
  }
}
