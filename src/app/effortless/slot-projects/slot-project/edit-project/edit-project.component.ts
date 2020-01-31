import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  constructor( public router:Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigateByUrl('effortless/slot-project');
  }

  save(){
    
  }
}
