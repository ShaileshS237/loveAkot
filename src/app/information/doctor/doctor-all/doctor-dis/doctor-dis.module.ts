import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorDisPageRoutingModule } from './doctor-dis-routing.module';

import { DoctorDisPage } from './doctor-dis.page';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorDisPageRoutingModule
  ],
  declarations: [DoctorDisPage],
  exports: [
    CommonModule,
    TimeagoModule,
  ]
})
export class DoctorDisPageModule {}
