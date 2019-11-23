import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EffortlessComponent } from './effortless.component';
import { Page1Component } from './page1/page1.component';

const routes: Routes = [{
  path: '',
  component: EffortlessComponent,
  children: [
    {
      path: 'page1',
      component: Page1Component,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EffortlessRoutingModule {
}
