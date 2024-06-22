import { Component, OnInit, Input } from '@angular/core';
import { GDS } from '../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { EffortlessComponentBase } from '../../../../efforless-base-component';

@Component({
  selector: 'ngx-resolve-component-ambiguity',
  templateUrl: './resolve-component-ambiguity.component.html',
  styleUrls: ['./resolve-component-ambiguity.component.scss']
})
export class ResolveComponentAmbiguityComponent extends EffortlessComponentBase implements OnInit {
  @Input() scds: any = [];
  @Input() slot: any;
  @Input() searchTerm: string = "";
  isLoading: boolean = false;
  processedSearchTerm: string = "";

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<ResolveComponentAmbiguityComponent>, private dialogService: NbDialogService, public toastr: NbToastrService) {
    super(gds, data, menuService)
  }

  ngOnInit() {
    this.processedSearchTerm = this.searchTerm;
  }

  selectScd(selected) {
    this.dialogRef.close(selected);
  }

  close() {
    this.dialogRef.close();
  }

  searchComps() {
    let self = this;
    var payload = this.gds.createPayload();
    payload.SearchTerm = this.searchTerm;
    payload.Flag = "SkipJurisdictions";
    self.isLoading = true;
    this.gds.smqATR.SearchLinkedComponents(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      } else {
        self.processedSearchTerm = self.searchTerm;
        if (reply.SlotComponentDefs != null) {
          self.scds = reply.SlotComponentDefs;
        } else {
          self.scds = [];
        }
      }
      self.isLoading = false;
    }).catch(function (error) {
      self.toastr.warning(error);
      self.isLoading = true;
    });
  }

}
