import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlooddonationPageRoutingModule } from './blooddonation-routing.module';

import { BlooddonationPage } from './blooddonation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlooddonationPageRoutingModule
  ],
  declarations: [BlooddonationPage]
})
export class BlooddonationPageModule {}
