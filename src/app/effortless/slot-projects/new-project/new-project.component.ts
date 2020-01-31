import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GDS } from '../../services/gds.service';

@Component({
  selector: 'ngx-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  constructor(private gds:GDS, public router:Router) { }

  ngOnInit() {
  }

goBack(){
  this.router.navigateByUrl('effortless/slot-projects');
}

save(){
  this.gds
}

}
