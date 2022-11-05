import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BdcampformPageRoutingModule } from './bdcampform-routing.module';

import { BdcampformPage } from './bdcampform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BdcampformPageRoutingModule
  ],
  declarations: [BdcampformPage]
})
export class BdcampformPageModule {}
