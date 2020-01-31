import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GDS } from '../../services/gds.service';

@Component({
  selector: 'ngx-search-storage-slots',
  templateUrl: './search-storage-slots.component.html',
  styleUrls: ['./search-storage-slots.component.scss']
})
export class SearchStorageSlotsComponent implements OnInit {

  constructor(public gds: GDS, public router: Router, ) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigateByUrl('effortless/storage-slots');
  }

  openSlot(){
    this.router.navigateByUrl('effortless/storage-slot')
  }
}
