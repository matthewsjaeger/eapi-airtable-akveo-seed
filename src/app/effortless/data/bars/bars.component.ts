import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss']
})
export class BarsComponent implements OnInit {

  constructor(public router : Router) { }

  ngOnInit() {
  }

  goToBar(id) {
    this.router.navigateByUrl('effortless/data/bars/bar/' + id);
  }
}
