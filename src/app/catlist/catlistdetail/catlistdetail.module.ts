import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatlistdetailPageRoutingModule } from './catlistdetail-routing.module';

import { CatlistdetailPage } from './catlistdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatlistdetailPageRoutingModule
  ],
  declarations: [CatlistdetailPage]
})
export class CatlistdetailPageModule {}
