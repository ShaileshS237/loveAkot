import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BddonarPageRoutingModule } from './bddonar-routing.module';

import { BddonarPage } from './bddonar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BddonarPageRoutingModule
  ],
  declarations: [BddonarPage]
})
export class BddonarPageModule {}
