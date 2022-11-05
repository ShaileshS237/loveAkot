import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReqbdPage } from './reqbd.page';

const routes: Routes = [
  {
    path: '',
    component: ReqbdPage
  },
  {
    path: 'reqbdform',
    loadChildren: () => import('./reqbdform/reqbdform.module').then( m => m.ReqbdformPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReqbdPageRoutingModule {}
