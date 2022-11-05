import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorAllPageRoutingModule } from './doctor-all-routing.module';

import { DoctorAllPage } from './doctor-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorAllPageRoutingModule
  ],
  declarations: [DoctorAllPage]
})
export class DoctorAllPageModule {}
