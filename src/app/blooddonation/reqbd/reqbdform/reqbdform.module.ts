import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReqbdformPageRoutingModule } from './reqbdform-routing.module';

import { ReqbdformPage } from './reqbdform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReqbdformPageRoutingModule
  ],
  declarations: [ReqbdformPage]
})
export class ReqbdformPageModule {}
