import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsdiscPage } from './newsdisc.page';

const routes: Routes = [
  {
    path: '',
    component: NewsdiscPage
  },
  {
    path: 'categorynews',
    loadChildren: () => import('./categorynews/categorynews.module').then( m => m.CategorynewsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsdiscPageRoutingModule {}
