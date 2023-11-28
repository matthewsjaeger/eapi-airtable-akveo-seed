import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-cdi-letter',
  templateUrl: './cdi-letter.component.html',
  styleUrls: ['./cdi-letter.component.scss']
})
export class CdiLetterComponent extends EffortlessComponentBase implements OnInit {
  components: any = [];
  filter: string = "";
  loading: boolean = false;
  timeout: boolean = false;
  initialPrompt: boolean = true;


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

  reload() { }

  searchAllComponents() {
    let self = this;
    var payload = this.gds.createPayload();
    payload.SearchTerm = this.filter;
    self.loading = true;
    self.timeout = false;
    this.gds.smqATR.SearchLinkedComponents(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      } else {
        if (reply.SlotComponentDefs != null) {
          console.error(reply.SlotComponentDefs);
          reply.SlotComponentDefs.forEach(comp => {
            self.formatDates(comp.Jurisdictions);
          });
          self.components = reply.SlotComponentDefs;
          self.initialPrompt = false;
        }
      }
      self.loading = false;
    }).catch(function (error) {
      self.toastr.warning(error);
      self.initialPrompt = false;
      self.loading = false;
      self.timeout = true;
    });
  }

  formatDates(jurs) {
    console.error('AAAAA', jurs);
    let self = this;
    jurs.forEach(jur => {
      jur.formattedSubmitted = self.formatDate(jur.VendorSubmitted);
      jur.formattedCertified = self.formatDate(jur.TestLabCertified);
    });
  }

  formatDate(dateString) {
    let date = new Date(dateString);
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset * 60 * 1000))
    return date.toISOString().split('T')[0]
  }

  download(doc) {
    let self = this;
    var payload = this.gds.createPayload();
    payload.Document = doc;
    this.gds.smqATR.DownloadLetter(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      } else {
        self.toastr.success("Successfully downloaded pdf to C:/Letters/" + doc.DocumentName);
      }
    });
  }

}
