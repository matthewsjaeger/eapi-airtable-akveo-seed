import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EffortlessComponent } from './effortless.component';
import { IonicComponent } from './ionic/ionic.component';
import { Page2Component } from './page2/page2.component';
import { StorageSlotsComponent} from './storage-slots/storage-slots.component';
import { SlotProjectsComponent} from './slot-projects/slot-projects.component';
import { SearchStorageSlotsComponent } from './storage-slots/search-storage-slots/search-storage-slots.component';

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
