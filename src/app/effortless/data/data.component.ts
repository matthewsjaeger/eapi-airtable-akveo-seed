import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BaseDataComponent } from './base-data-component';

@Component({
  selector: 'ngx-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent extends BaseDataComponent implements OnInit {

  constructor(public router: Router) {
    super()
   }

  ngOnInit() {
  }

  goToData(page) {
    this.router.navigateByUrl('effortless/data/' + page);
  }
}
