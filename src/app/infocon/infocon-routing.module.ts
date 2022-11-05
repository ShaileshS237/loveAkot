import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoconPage } from './infocon.page';

const routes: Routes = [
  {
    path: '',
    component: InfoconPage
  },
  {
    path: 'infocondetail',
    loadChildren: () => import('./infocondetail/infocondetail.module').then( m => m.InfocondetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoconPageRoutingModule {}
