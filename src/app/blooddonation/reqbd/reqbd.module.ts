import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReqbdPageRoutingModule } from './reqbd-routing.module';

import { ReqbdPage } from './reqbd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReqbdPageRoutingModule
  ],
  declarations: [ReqbdPage]
})
export class ReqbdPageModule {}
