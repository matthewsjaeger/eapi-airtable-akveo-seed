import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-stacker-full-record',
  templateUrl: './stacker-full-record.component.html',
  styleUrls: ['./stacker-full-record.component.scss']
})
export class StackerFullRecordComponent implements OnInit {

  checked = false;



  constructor() { }

  ngOnInit() {
  }

  toggle(checked: boolean) {
    this.checked = checked;
  }


}
