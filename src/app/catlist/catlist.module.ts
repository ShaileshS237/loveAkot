import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatlistPageRoutingModule } from './catlist-routing.module';

import { CatlistPage } from './catlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatlistPageRoutingModule
  ],
  declarations: [CatlistPage]
})
export class CatlistPageModule {}
