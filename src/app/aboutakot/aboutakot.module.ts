import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutakotPageRoutingModule } from './aboutakot-routing.module';

import { AboutakotPage } from './aboutakot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutakotPageRoutingModule
  ],
  declarations: [AboutakotPage]
})
export class AboutakotPageModule {}
