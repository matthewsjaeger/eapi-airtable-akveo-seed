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
    this.$on("$ionicView.enter", function() {
      this.data = {};
      this.data.editingSlot = false;
      this.Slots = this.gds.isATR.GAINS.currentSlots;
      console.log(this.Slots);
      
      this.configureActions = function() {
          this.availableActions = {
              'atrInspection': false
              , 'completeApplyLicense': false
              , 'designateToMuseum': false                
              , 'editSeals': false                
              , 'menu.scheduleDestruction': false
              , 'scheduleReturn': false
              , 'scheduleSale': false
              , 'scheduleStorageToFloor': false
              , 'cancelScheduledEvents': false
              , 'completeConversion': false
              , 'editConversion': false
              , 'completeRemoval': false
              , 'editScheduledRemoval': false
          };
           
          switch (this.Slots[0].WorkflowState) {
              case 'Stored':
                  this.availableActions.atrInspection = true;
                  this.availableActions.completeApplyLicense = true;
                  this.availableActions.designateToMuseum = true;
                  this.availableActions.editSeals = true;
                  this.availableActions.scheduleDestruction = true;
                  this.availableActions.scheduleReturn = true;
                  this.availableActions.scheduleSale = true;
                  this.availableActions.scheduleStorageToFloor = true;
                  break;
              case 'Stored - Conversion Scheduled':
                  this.availableActions.cancelScheduledEvents = true;
                  this.availableActions.completeConversion = true;
                  this.availableActions.editConversion = true;
                  this.availableActions.editSeals = true;
                  break;
              case 'Removal Scheduled':
                  this.availableActions.cancelScheduledEvents = true;
                  this.availableActions.completeRemoval = true;
                  this.availableActions.editScheduledRemoval = true;
                  this.availableActions.editSeals = true;
                  break;
              case 'Physically Removed':
                  break;
          }
      };
      this.refreshSlots();
  });

  }

  logStuff() {
    console.error(this.gds.GAINSUser);
  }

}
