import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsaddPageRoutingModule } from './eventsadd-routing.module';

import { EventsaddPage } from './eventsadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsaddPageRoutingModule
  ],
  declarations: [EventsaddPage]
})
export class EventsaddPageModule {}
