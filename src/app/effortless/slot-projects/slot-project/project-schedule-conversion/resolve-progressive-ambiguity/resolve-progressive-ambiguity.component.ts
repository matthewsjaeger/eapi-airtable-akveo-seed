import { Component, OnInit, Input } from '@angular/core';
import { EffortlessComponentBase } from '../../../../efforless-base-component';
import { NbToastrService, NbMenuService, NbDialogRef, NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { GDS } from '../../../../services/gds.service';

@Component({
  selector: 'ngx-resolve-progressive-ambiguity',
  templateUrl: './resolve-progressive-ambiguity.component.html',
  styleUrls: ['./resolve-progressive-ambiguity.component.scss']
})
export class ResolveProgressiveAmbiguityComponent extends EffortlessComponentBase implements OnInit {
  @Input() progs: any = [];
  @Input() slot: any;
  @Input() searchTerm: string = "";
  isLoading: boolean = false;
  processedSearchTerm: string = "";

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService,
    public route: ActivatedRoute, protected dialogRef: NbDialogRef<ResolveProgressiveAmbiguityComponent>, private dialogService: NbDialogService, public toastr: NbToastrService) {
    super(gds, data, menuService)
  }

  ngOnInit() {
    this.processedSearchTerm = this.searchTerm;
  }

  selectProg(selected) {
    this.dialogRef.close(selected);
  }

  close() {
    this.dialogRef.close();
  }

  searchComps() {
    let self = this;
    var payload = this.gds.createPayload();
    payload.SearchTerm = this.searchTerm;
    payload.Flag = "Robust";
    self.isLoading = true;
    this.gds.smqUser.SearchProgressiveDef(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      } else {
        self.processedSearchTerm = self.searchTerm;
        if (reply.SlotGameDefs != null) {
          self.progs = reply.ProgressiveDefs;
        } else {
          self.progs = [];
        }
      }
      self.isLoading = false;
    }).catch(function (error) {
      self.toastr.warning(error);
      self.isLoading = true;
    });
  }

}
