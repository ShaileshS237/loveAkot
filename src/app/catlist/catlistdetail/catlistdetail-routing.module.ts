import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { CatlistdetailPage } from './catlistdetail.page';

const routes: Routes = [
  {
    path: '',
    component: CatlistdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TimeagoModule],
})
export class CatlistdetailPageRoutingModule {}
