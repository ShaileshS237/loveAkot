import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BdcampPageRoutingModule } from './bdcamp-routing.module';

import { BdcampPage } from './bdcamp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BdcampPageRoutingModule
  ],
  declarations: [BdcampPage]
})
export class BdcampPageModule {}
