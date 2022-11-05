import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Location } from "@angular/common";
import { LoadingController } from '@ionic/angular';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import{ init } from 'emailjs-com';
import { ActivatedRoute } from '@angular/router';
init("user_JyvCDa85QxXmPjQXyWzVh");
import { Storage } from '@ionic/storage-angular';

@Component({
  
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  click:any ='no';
  status: boolean = false;
  id: any;
  image1="";
  buttonActive: boolean = true;
  Name:any;
  name:any;
  message:any;
  public imgSrc: any;
  clicked:any = 0;
  formid: any;
  error2: boolean = false;
  error: boolean = false;
  error3: boolean;
  email: any;
  language: any;
  constructor(
    private route: ActivatedRoute,public storage:Storage,
    public toastController: ToastController,public loadingController: LoadingController,private location:Location,) {
      this.storage.get('lang').then((val)=>{
        this.language = val
        
       })

    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id = params.id;
      }
    });
   }
   sendEmail(e: Event) {
    if (this.id==10) {
      if (this.name == undefined || this.name == '') {
        this.error = true
      } 
      else if (this.email == undefined || this.email == '') {
        this.error3 = true
      }
      else if (this.message == undefined || this.message == '') {
        this.error2 = true
      }
      else {
        this.clicked = 1;
      e.preventDefault();
      emailjs.sendForm('service_6eu92lj', 'template_oacvqge', e.target as HTMLFormElement)
        .then((result: EmailJSResponseStatus) => {
          this.presentLoading()
        }, (error) => {
          console.log(error.text);
        });
      }
    } else {
      if (this.name == undefined || this.name == '') {
        this.error = true
      } 
     else if (this.message == undefined || this.message == '') {
        this.error2 = true
      }
      else {
        this.clicked = 1;
      e.preventDefault();
      emailjs.sendForm('service_6eu92lj', 'template_oacvqge', e.target as HTMLFormElement)
        .then((result: EmailJSResponseStatus) => {
          this.presentLoading()
        }, (error) => {
          console.log(error.text);
        });
      }
    }
  }

   clickEvent(){
       this.status = !this.status;       
   }
   addClass(id: any,src:any) {
    this.id = id;
    return this.imgSrc = src;
   
}
  async presentToast() {
    if(this.id == 10){
      const toast = await this.toastController.create({
        message: 'Thankyou, Your query will resolve shortly ',
        duration: 2000,
      });
      toast.present();
    }
  else{
    const toast = await this.toastController.create({
      message: ' ❤ Thankyou For Your Feedback',
      duration: 2000,
    });
    toast.present();
  }
    
    
    this.location.back(); 

  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Sending Feedback,Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.presentToast();
  }

  ngOnInit() {
    
  }
  sendFeedback(){
    this.presentLoading();
    
  }
  noerror() {
    this.error = false;

  }
  noerror2() {
    this.error2 = false
  }
  noerror3() {
    this.error3 = false
  }
}
