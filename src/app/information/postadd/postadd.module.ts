import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PostaddPageRoutingModule } from './postadd-routing.module';
import { PostaddPage } from './postadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostaddPageRoutingModule
  ],
  
  declarations: [PostaddPage]
})
export class PostaddPageModule {}
