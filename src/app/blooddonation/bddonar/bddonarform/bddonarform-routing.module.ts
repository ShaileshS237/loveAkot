import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BddonarformPage } from './bddonarform.page';

const routes: Routes = [
  {
    path: '',
    component: BddonarformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BddonarformPageRoutingModule {}
