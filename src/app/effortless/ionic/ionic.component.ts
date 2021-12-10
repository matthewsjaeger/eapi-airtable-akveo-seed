import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-ionic',
  templateUrl: './ionic.component.html',
  styleUrls: ['./ionic.component.scss']
})
export class IonicComponent implements OnInit {
  iframeSrc: any = window['iframeSrc'];

  constructor() { }

  ngOnInit() {
    console.error(this.iframeSrc);
  }

}
