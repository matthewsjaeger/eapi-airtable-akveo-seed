import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'ngx-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(public router : Router) { }

  ngOnInit() {
  }
 
  goToData(page) {
    this.router.navigateByUrl('effortless/data/' + page);
  }
}
