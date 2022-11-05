import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BdfaqPage } from './bdfaq.page';

const routes: Routes = [
  {
    path: '',
    component: BdfaqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BdfaqPageRoutingModule {}
