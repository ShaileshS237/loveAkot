import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorynewsPageRoutingModule } from './categorynews-routing.module';

import { CategorynewsPage } from './categorynews.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorynewsPageRoutingModule
  ],
  declarations: [CategorynewsPage]
})
export class CategorynewsPageModule {}
