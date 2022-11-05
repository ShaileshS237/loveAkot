import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClistPageRoutingModule } from './clist-routing.module';

import { ClistPage } from './clist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClistPageRoutingModule
  ],
  declarations: [ClistPage]
})
export class ClistPageModule {}
