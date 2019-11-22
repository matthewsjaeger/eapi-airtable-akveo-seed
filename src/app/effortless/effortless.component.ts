import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './effortless-menu';
import { GDS } from './services/gds.service';
import { NbMenuService, NbMenuItem } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-usp',
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class UspComponent implements OnInit {
  items:NbMenuItem[];
  constructor(public gds: GDS, protected nbMenuService: NbMenuService, public router: Router) {
    // this.items = this.getMenu();
    
  }

  ngOnInit() {
    this.router.navigateByUrl('/usp/inquiries');
  }

  // getMenu() {

  //   return MENU_ITEMS;
  // }
  
  menu = MENU_ITEMS;  
}
