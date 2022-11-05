import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatlistPage } from './catlist.page';

const routes: Routes = [
  {
    path: '',
    component: CatlistPage
  },
  {
    path: 'catlistdetail',
    loadChildren: () => import('./catlistdetail/catlistdetail.module').then( m => m.CatlistdetailPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatlistPageRoutingModule {}
