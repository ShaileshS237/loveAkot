import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
import { TimeagoModule } from 'ngx-timeago';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, 
    TimeagoModule,],
})
export class Tab3PageRoutingModule {}
