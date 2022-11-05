import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BdbankPage } from './bdbank.page';

const routes: Routes = [
  {
    path: '',
    component: BdbankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BdbankPageRoutingModule {}
