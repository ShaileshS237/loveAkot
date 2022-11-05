import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BddonarformPageRoutingModule } from './bddonarform-routing.module';

import { BddonarformPage } from './bddonarform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BddonarformPageRoutingModule
  ],
  declarations: [BddonarformPage]
})
export class BddonarformPageModule {}
