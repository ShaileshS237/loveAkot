import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BdPageRoutingModule } from './bd-routing.module';

import { BdPage } from './bd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BdPageRoutingModule
  ],
  declarations: [BdPage]
})
export class BdPageModule {}
