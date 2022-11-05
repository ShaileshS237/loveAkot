import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoconPageRoutingModule } from './infocon-routing.module';

import { InfoconPage } from './infocon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoconPageRoutingModule
  ],
  declarations: [InfoconPage]
})
export class InfoconPageModule {}
