import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdddoctorsPageRoutingModule } from './adddoctors-routing.module';

import { AdddoctorsPage } from './adddoctors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdddoctorsPageRoutingModule
  ],
  declarations: [AdddoctorsPage]
})
export class AdddoctorsPageModule {}
