import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EffortlessComponent } from './effortless.component';
import { IonicComponent } from './ionic/ionic.component';


let effortlessChildren = [
  {
    path: 'ionic',
    component: IonicComponent,
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
