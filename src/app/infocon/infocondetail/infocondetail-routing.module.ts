import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfocondetailPage } from './infocondetail.page';

const routes: Routes = [
  {
    path: '',
    component: InfocondetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfocondetailPageRoutingModule {}
