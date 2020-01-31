import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-storage-slot',
  templateUrl: './storage-slot.component.html',
  styleUrls: ['./storage-slot.component.scss']
})
export class StorageSlotComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigateByUrl('effortless/search-storage-slots')
  }
}
