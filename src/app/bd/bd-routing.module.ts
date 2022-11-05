import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BdPage } from './bd.page';

const routes: Routes = [
  {
    path: '',
    component: BdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BdPageRoutingModule {}
