import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdddoctorsPage } from './adddoctors.page';

const routes: Routes = [
  {
    path: '',
    component: AdddoctorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdddoctorsPageRoutingModule {}
