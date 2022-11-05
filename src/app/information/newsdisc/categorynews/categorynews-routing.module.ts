import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { CategorynewsPage } from './categorynews.page';

const routes: Routes = [
  {
    path: '',
    component: CategorynewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TimeagoModule],
})
export class CategorynewsPageRoutingModule {}
