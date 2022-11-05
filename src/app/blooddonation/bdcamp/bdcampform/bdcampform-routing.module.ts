import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BdcampformPage } from './bdcampform.page';

const routes: Routes = [
  {
    path: '',
    component: BdcampformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BdcampformPageRoutingModule {}
