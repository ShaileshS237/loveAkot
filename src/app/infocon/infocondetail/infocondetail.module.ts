import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfocondetailPageRoutingModule } from './infocondetail-routing.module';

import { InfocondetailPage } from './infocondetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfocondetailPageRoutingModule
  ],
  declarations: [InfocondetailPage]
})
export class InfocondetailPageModule {}
