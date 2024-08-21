import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { NbMenuService, NbDialogService, NbToastrService } from '@nebular/theme';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../../services/gds.service';
import { ResolveComponentAmbiguityComponent } from '../project-schedule-conversion/resolve-component-ambiguity/resolve-component-ambiguity.component';
import { ResolveReadOnlyComponent } from '../project-schedule-conversion/resolve-read-only/resolve-read-only.component';

@Component({
  selector: 'ngx-configure-slot',
  templateUrl: './configure-slot.component.html',
  styleUrls: ['./configure-slot.component.scss']
})
export class ConfigureSlotComponent extends EffortlessComponentBase implements OnInit {
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
    this.toastr.warning("Not implemented yet.");
    return;

    //let self = this;
    //let payload = self.gds.createPayload();
    //payload.SlotViews = this.slots;
    //self.gds.smqSlotRepairAdmin.ScheduleConversionWrite(payload).then(function (reply) {
    //  if (reply.ErrorMessage) {
    //    self.toastr.danger(reply.ErrorMessage);
    //  } else {
    //    self.writeFileXlsx(reply.File, reply.SearchTerm);
    //  }
    //});
  }

  writeFileXlsx(xlsx, filename) {
    const binaryString = window.atob(xlsx);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
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
    this.toastr.warning("Not implemented yet.");
    return;

    //const files: FileList = event.target.files
    //let self = this;
    //if (files && files.length > 0) {
    //  let file: File = files.item(0);
    //  let reader: FileReader = new FileReader();
    //  reader.onload = (e) => {
    //    const arrayBuffer = reader.result as ArrayBuffer;
    //    const uint8Array = new Uint8Array(arrayBuffer);
    //    const base64Encoded = this.arrayBufferToBase64(uint8Array);

    //    this.parseChanges(this, base64Encoded);
    //  }
    //  reader.onerror = (error) => {
    //    console.error('Error reading file:', error);
    //  };

    //  reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer

    //  event.target.value = null;
    //}
  }

  parseChanges(self, base64Encoded) {
    let payload = self.gds.createPayload();
    payload.File = base64Encoded;
    self.loading = true;
    self.gds.smqSlotRepairAdmin.ScheduleConversionRead(payload).then(function (reply) {
      self.loading = false;
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      } else {
        console.error(reply);
        self.changes = reply.ChangeSummary.Changes;
        self.checkForAmbiguities(self);
        //self.handleAmbiguities(self.changes, self);
      }
    }).catch(function (error) {
      self.toastr.warning("Request timed out.");
      self.loading = false;
    });;
  }

  arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    const bytes = buffer;
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  public changeListenerOld(event) {
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
            self.toastr.warning(reply.ErrorMessage);
          } else {
            console.error(reply);
            self.changes = reply.ChangeSummary.Changes;
            self.checkForAmbiguities(self);
            //self.handleAmbiguities(self.changes, self);
          }
        }).catch(function (error) {
          self.toastr.warning("Request timed out.");
          self.loading = false;
        });;
      }
      event.target.value = null;
    }
  }

  handleAmbiguities(changes, self) {
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
    if (fieldChange.Error) {
      this.resolveReadOnly(change, fieldChange);
      return;
    }

    let self = this;
    console.error('SSSS', change)
    this.dialogService.open(ResolveComponentAmbiguityComponent, {
      context: {
        'scds': fieldChange.Comps,
        'slot': change.Description,
        'searchTerm': fieldChange.SearchTerm
      }
    }).onClose.subscribe(resp => self.resolveComponent(resp, change, fieldChange, self));
  }

  resolveComponent(resp, change, fieldChange, self) {
    if (resp) {
      fieldChange.New = resp.SimplifiedDisplayText;
      let resolved = true;
      change.Changes.forEach(function (fChange) {
        if (fChange.New == "Resolving ambiguity") {
          resolved = false;
        }
      });
      if (resolved) {
        change.Ambiguous = false;
      }
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
    let self = this;
    let payload = self.gds.createPayload();
    payload.ChangeSummary = { Changes: self.changes };
    self.gds.smqSlotRepairAdmin.ScheduleConversionConfirm(payload).then(function (reply) {
      self.loading = false;
      if (reply.ErrorMessage) {
        self.toastr.danger(reply.ErrorMessage);
      } else {
        self.toastr.success("Conversion scheduled.");
        self.router.navigateByUrl('effortless/slot-projects');
      }
    });
  }
}
