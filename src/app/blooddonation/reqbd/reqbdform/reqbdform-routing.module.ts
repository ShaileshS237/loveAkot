import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReqbdformPage } from './reqbdform.page';

const routes: Routes = [
  {
    path: '',
    component: ReqbdformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReqbdformPageRoutingModule {}
