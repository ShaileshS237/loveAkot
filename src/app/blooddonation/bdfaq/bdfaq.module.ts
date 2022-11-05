import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BdfaqPageRoutingModule } from './bdfaq-routing.module';

import { BdfaqPage } from './bdfaq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BdfaqPageRoutingModule
  ],
  declarations: [BdfaqPage]
})
export class BdfaqPageModule {}
