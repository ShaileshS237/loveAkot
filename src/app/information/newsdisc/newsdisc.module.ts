import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsdiscPageRoutingModule } from './newsdisc-routing.module';

import { NewsdiscPage } from './newsdisc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsdiscPageRoutingModule
  ],
  declarations: [NewsdiscPage]
})
export class NewsdiscPageModule {}
