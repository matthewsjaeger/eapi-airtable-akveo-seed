import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './effortless-menu';
import { GDS } from './services/gds.service';
import { NbMenuService, NbMenuItem } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-effortless',
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class EffortlessComponent implements OnInit {
  items:NbMenuItem[];
  constructor(public gds: GDS, protected nbMenuService: NbMenuService, public router: Router) {
    // this.items = this.getMenu();
    
  }

  ngOnInit() {
    this.router.navigateByUrl('/effortless/page1');
  }

  // getMenu() {

  //   return MENU_ITEMS;
  // }
  
  menu = MENU_ITEMS;  
}
