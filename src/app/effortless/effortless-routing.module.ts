import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { EffortlessComponent } from './effortless.component';
import { IonicComponent } from './ionic/ionic.component';
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
import { MediaVerificationComponent } from './on-floor/on-floor-slot/media-verification/media-verification.component';
import { StackerFullRecordComponent } from './on-floor/on-floor-slot/stacker-full-record/stacker-full-record.component';
import { VerifyTenTwentyComponent } from './on-floor/on-floor-slot/verify-ten-twenty/verify-ten-twenty.component';
import { PreventativeMaintenanceComponent } from './on-floor/on-floor-slot/preventative-maintenance/preventative-maintenance.component';

let effortlessChildren = [
  {
    path: 'ionic',
    component: IonicComponent,
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
    path: 'slot-project/:pid',
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
    path: 'storage-slot/:sid',
    component: StorageSlotComponent,
  },
  {
    path: 'on-floor/:sid',
    component: OnFloorComponent
  },
  {
    path: 'on-floor-slot/:sid',
    component: OnFloorSlotComponent,
  },
  {
    path: 'emergency-drop-inspection/:sid',
    component: EmergencyDropInspectionComponent,
  },
  {
    path: 'media-verification/:sid',
    component: MediaVerificationComponent,
  },
  {
    path: 'stacker-full-record/:sid',
    component: StackerFullRecordComponent,
  },
  {
    path: 'verify-ten-twenty/:sid',
    component: VerifyTenTwentyComponent,
  },
  {
    path: 'preventative-maintenance/:sid',
    component: PreventativeMaintenanceComponent,
  },
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
