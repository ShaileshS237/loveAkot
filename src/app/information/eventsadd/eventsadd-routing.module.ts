import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsaddPage } from './eventsadd.page';

const routes: Routes = [
  {
    path: '',
    component: EventsaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsaddPageRoutingModule {}
