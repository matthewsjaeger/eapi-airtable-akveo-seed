import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EffortlessComponent } from './effortless.component';
import { Page1Component } from './page1/page1.component';
import { DerivedDataDeclarations } from './data/derived-data-declarations';


let effortlessChildren = [
  {
    path: 'page1',
    component: Page1Component,
  },
];
DerivedDataDeclarations.derivedPages.forEach(feDerivedPage => {
  effortlessChildren.push(feDerivedPage);
});

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
