import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoneyconPageRoutingModule } from './moneycon-routing.module';

import { MoneyconPage } from './moneycon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoneyconPageRoutingModule
  ],
  declarations: [MoneyconPage]
})
export class MoneyconPageModule {}
