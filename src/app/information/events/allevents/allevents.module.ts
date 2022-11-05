import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlleventsPageRoutingModule } from './allevents-routing.module';

import { AlleventsPage } from './allevents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlleventsPageRoutingModule
  ],
  declarations: [AlleventsPage]
})
export class AlleventsPageModule {}
