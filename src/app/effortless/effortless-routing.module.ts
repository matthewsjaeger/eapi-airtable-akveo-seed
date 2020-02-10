import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EffortlessComponent } from './effortless.component';
import { IonicComponent } from './ionic/ionic.component';
import { Page2Component } from './page2/page2.component';
import { StorageSlotsComponent} from './storage-slots/storage-slots.component';
import { SlotProjectsComponent} from './slot-projects/slot-projects.component';
import { SearchStorageSlotsComponent } from './storage-slots/search-storage-slots/search-storage-slots.component';
import { SlotProjectComponent } from './slot-projects/slot-project/slot-project.component';
import { NewProjectComponent } from './slot-projects/new-project/new-project.component';
import { EditProjectComponent } from './slot-projects/slot-project/edit-project/edit-project.component';
import { StorageSlotComponent } from './storage-slots/search-storage-slots/storage-slot/storage-slot.component';
import { OnFloorComponent } from './on-floor/on-floor.component';
import { OnFloorSlotComponent } from './on-floor/on-floor-slot/on-floor-slot.component';
import { EmergencyDropInspectionComponent } from './on-floor/on-floor-slot/emergency-drop-inspection/emergency-drop-inspection.component';

let effortlessChildren = [
  {
    path: 'ionic',
    component: IonicComponent,
  },
  {
    path: 'page2',
    component: Page2Component,
  },
  {
    path: 'storage-slots',
    component: StorageSlotsComponent,
  },
  {
    path: 'slot-projects',
    component: SlotProjectsComponent,
  },
  {
    path: 'search-storage-slots',
    component: SearchStorageSlotsComponent,
  },
  {
    path: 'slot-project',
    component: SlotProjectComponent,
  },
  {
    path: 'new-project',
    component: NewProjectComponent,
  },
  {
    path: 'edit-project',
    component: EditProjectComponent,
  },
  {
    path: 'storage-slot',
    component: StorageSlotComponent,
  },
  {
    path: 'on-floor',
    component: OnFloorComponent
  },
  {
    path: 'on-floor-slot/:sid',
    component: OnFloorSlotComponent,
  },
  {
    path: 'emergency-drop-inspection',
    component: EmergencyDropInspectionComponent,
  }
];

const routes: Routes = [{
  path: '',
  component: EffortlessComponent,
  children: effortlessChildren,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EffortlessRoutingModule {
}
