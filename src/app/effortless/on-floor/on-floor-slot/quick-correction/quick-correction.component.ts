import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { GDS } from '../../../services/gds.service';

@Component({
  selector: 'ngx-quick-correction',
  templateUrl: './quick-correction.component.html',
  styleUrls: ['./quick-correction.component.scss']
})
export class QuickCorrectionComponent implements OnInit {
  timeAccessed: any;
  SelectedSlots: any = [];

  constructor( protected dialogRef: NbDialogRef<QuickCorrectionComponent>, public gds: GDS) { }

  ngOnInit() {
    
  }

  create(){

  }

  noProject(){

  }

  cancel(){
    this.dialogRef.close()
  }

}
