import { Component, OnInit } from '@angular/core';
import { GDS } from '../services/gds.service';

@Component({
  selector: 'ngx-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit {

  constructor(public gds: GDS) { }

  ngOnInit() {
  }

  logStuff() {
    console.error(this.gds.GAINSUser);
  }

}
