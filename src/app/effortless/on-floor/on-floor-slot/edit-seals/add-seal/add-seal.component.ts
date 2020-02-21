import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-add-seal',
  templateUrl: './add-seal.component.html',
  styleUrls: ['./add-seal.component.scss']
})
export class AddSealComponent implements OnInit {

  constructor(private dialogService: NbDialogService) { }

  ngOnInit() {
  }

}
