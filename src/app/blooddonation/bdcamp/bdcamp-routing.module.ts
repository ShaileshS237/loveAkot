import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BdcampPage } from './bdcamp.page';

const routes: Routes = [
  {
    path: '',
    component: BdcampPage
  },
  {
    path: 'bdcampform',
    loadChildren: () => import('./bdcampform/bdcampform.module').then( m => m.BdcampformPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BdcampPageRoutingModule {}
