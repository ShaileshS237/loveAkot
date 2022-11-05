import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlleventsPage } from './allevents.page';

const routes: Routes = [
  {
    path: '',
    component: AlleventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlleventsPageRoutingModule {}
