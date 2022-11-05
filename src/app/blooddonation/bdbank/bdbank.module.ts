import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BdbankPageRoutingModule } from './bdbank-routing.module';

import { BdbankPage } from './bdbank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BdbankPageRoutingModule
  ],
  declarations: [BdbankPage]
})
export class BdbankPageModule {}
