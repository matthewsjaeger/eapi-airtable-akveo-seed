import { Component, OnInit } from '@angular/core';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-state-inspection',
  templateUrl: './state-inspection.component.html',
  styleUrls: ['./state-inspection.component.scss']
})
export class StateInspectionComponent extends EffortlessComponentBase implements OnInit {
  sid: any;

  constructor(public gds: GDS, public router: Router, public data: DataEndpoint, protected menuService: NbMenuService, public route: ActivatedRoute ) { 
    super (gds, data, menuService) 

    this.safeSubscribe(this.route.params.subscribe((params) => {
      this.sid = params['sid'];   
    }));

  } 

  ngOnInit() {
  }

cancel(){
  let self = this
  this.router.navigateByUrl('effortless/on-floor-slot/' + self.sid)
}

next(){
  let self = this
  this.router.navigateByUrl('effortless/inspection-record/' + self.sid)
}

}
