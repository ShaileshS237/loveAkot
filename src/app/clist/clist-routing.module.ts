import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClistPage } from './clist.page';

const routes: Routes = [
  {
    path: '',
    component: ClistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClistPageRoutingModule {}
