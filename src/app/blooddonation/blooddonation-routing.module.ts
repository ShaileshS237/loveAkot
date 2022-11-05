import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlooddonationPage } from './blooddonation.page';

const routes: Routes = [
  {
    path: '',
    component: BlooddonationPage
  },
  {
    path: 'reqbd',
    loadChildren: () => import('./reqbd/reqbd.module').then( m => m.ReqbdPageModule)
  },
  {
    path: 'bddonar',
    loadChildren: () => import('./bddonar/bddonar.module').then( m => m.BddonarPageModule)
  },
  {
    path: 'bdbank',
    loadChildren: () => import('./bdbank/bdbank.module').then( m => m.BdbankPageModule)
  },
  {
    path: 'bdcamp',
    loadChildren: () => import('./bdcamp/bdcamp.module').then( m => m.BdcampPageModule)
  },
  {
    path: 'bdfaq',
    loadChildren: () => import('./bdfaq/bdfaq.module').then( m => m.BdfaqPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlooddonationPageRoutingModule {}
