import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorAllPage } from './doctor-all.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorAllPage
  },
  {
    path: 'doctor-dis',
    loadChildren: () => import('./doctor-dis/doctor-dis.module').then( m => m.DoctorDisPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorAllPageRoutingModule {}
