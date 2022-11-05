import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { DoctorDisPage } from './doctor-dis.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorDisPage
  },
  {
    path: 'adddoctors',
    loadChildren: () => import('./adddoctors/adddoctors.module').then( m => m.AdddoctorsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TimeagoModule],
})
export class DoctorDisPageRoutingModule {}
