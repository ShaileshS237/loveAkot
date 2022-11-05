import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage'
import { LoadingController, ToastController } from '@ionic/angular';

import * as $ from 'jquery' 
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  date: string;
  EmailId: any;
  Name: any;
  Message: any;

  constructor(private firestore:AngularFirestore,private loadingController:LoadingController,
    public toastController: ToastController) {
    this.date = new Date().toString();
   }

  ngOnInit() {
    // $('button').on("click",function(){
    //   $('button').toggleClass('active');
    //   $('.title').toggleClass('active');
    //   $('nav').toggleClass('active');
    // });
  }
  async createContact(){
    let Records = {};
    Records['Name'] = this.Name;
    Records['EmailId'] = this.EmailId;
    Records['Message'] = this.Message;
    Records['Date'] = this.date;
    
     try {
      await this.firestore.collection("contactMessage").add(Records);
      this.presentLoading();
     } catch (error) {
      console.log(error) 
     }
}
async presentLoading() {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Sending Message,Please wait...',
    duration: 2000
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  console.log('Loading dismissed!');
  this.presentToast();
}
async presentToast() {
    
  const toast = await this.toastController.create({
    message: 'Thank You! You Will Get Reolution As Soon As Possible',
    duration: 2000,
    
  });
  toast.present();
  

}
}
