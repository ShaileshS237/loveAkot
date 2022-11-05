import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutakotPage } from './aboutakot.page';

const routes: Routes = [
  {
    path: '',
    component: AboutakotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutakotPageRoutingModule {}
