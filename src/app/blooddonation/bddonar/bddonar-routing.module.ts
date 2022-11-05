import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BddonarPage } from './bddonar.page';

const routes: Routes = [
  {
    path: '',
    component: BddonarPage
  },
  {
    path: 'bddonarform',
    loadChildren: () => import('./bddonarform/bddonarform.module').then( m => m.BddonarformPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BddonarPageRoutingModule {}
