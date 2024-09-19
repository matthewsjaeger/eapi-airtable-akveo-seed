import { Component, OnInit, Input } from '@angular/core';
import { EffortlessComponentBase } from '../../../../efforless-base-component';
import { GDS } from '../../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { ResolveComponentAmbiguityComponent } from '../resolve-component-ambiguity/resolve-component-ambiguity.component';

@Component({
  selector: 'ngx-resolve-game-ambiguity',
  templateUrl: './resolve-game-ambiguity.component.html',
  styleUrls: ['./resolve-game-ambiguity.component.scss']
})
export class ResolveGameAmbiguityComponent extends EffortlessComponentBase implements OnInit {
  @Input() sgds: any = [];
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

  selectSgd(selected) {
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
    this.gds.smqUser.SearchGameName(payload).then(function (reply) {
      if (reply.ErrorMessage) {
        self.toastr.warning(reply.ErrorMessage);
      } else {
        self.processedSearchTerm = self.searchTerm;
        if (reply.SlotGameDefs != null) {
          self.sgds = reply.SlotGameDefs;
        } else {
          self.sgds = [];
        }
      }
      self.isLoading = false;
    }).catch(function (error) {
      self.toastr.warning(error);
      self.isLoading = true;
    });
  }

}
