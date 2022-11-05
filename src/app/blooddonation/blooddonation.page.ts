import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { interval, Subscription } from 'rxjs';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-blooddonation',
  templateUrl: './blooddonation.page.html',
  styleUrls: ['./blooddonation.page.scss'],
})
export class BlooddonationPage implements OnInit {
  daysSlides = {
    zoom: false,
    slidesPerView: 2.8,
    spaceBetween : 8,
    pagination: '.swiper-pagination',
   
  };
  private updateSubscription: Subscription;
  showError: boolean;
  constructor(public alertController: AlertController,public toastController: ToastController) { 
    this.updateSubscription = interval(1000).subscribe(
      (val) => { 
        if(navigator.onLine){
          this.showError = false;
         }
         else{
           this.showError = true;
           
         }
    }


);
  }

  ngOnInit() {
  }
do1(){
  console.log('ok');
  
}

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Coming Soon......',
      buttons: ['OK']
    });

    await alert.present();
}
click(){
  if(this.showError){
    this.presentToast();
  }
}
async presentToast() {
  const toast = await this.toastController.create({
    message: 'No Internet',
    duration: 2000
  });
  toast.present();
}

}
