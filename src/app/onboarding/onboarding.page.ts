import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonSlides, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import {AngularFirestore} from '@angular/fire/firestore'
import { Device } from '@ionic-native/device/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalController, AlertController, MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { CoronaService } from '../services/corona.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  animations: [
    trigger('fade', [      
      transition('void => *', [
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(300, style({opacity: 0}))
      ])
    ])

]
})
export class OnboardingPage implements OnInit {
  public onboardSlides =[];
  
  @ViewChild('mainSlides',{static:true}) slides:IonSlides;
  name:any;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    zoom: false,
    slidesPerView: 1,
    spaceBetween : 5,
    
    autoplay: {
      delay: 3000,
      // disableOnInteraction: false,
    },
  };
  data: any;
  index: number = 0;
  cssClass: any = 'btn';
  date: any;
  placeName:any = 'Enter Your Full Name';
  showError: boolean;

  constructor(
    public corona:CoronaService,public toastController: ToastController,         private httpClient:HttpClient,
    public menu: MenuController,public loadingController: LoadingController,
    private uniqueDeviceID: UniqueDeviceID, private device: Device,
    private storage: Storage,private router: Router,public firebase:AngularFirestore,) { }
  
  ngOnInit() {
    this.date=(new Date().toString()).replace(/\s/g, "").slice(0,17);
    console.log(this.date);
    
    this.data = new Date();
    this.onboardSlides =[
      {
      title:'play the beats',
      img:'/assets/slide_1.png',
      desc:'lorem32',
      visible:false,
    },
    {
      title:'live the live',
      img:'/assets/slide_2.png',
      desc:'lorem32',
      visible:false,
    },
    {
      title:'capture  the monetbs',
      img:'/assets/slide_3.png',
      desc:'lorem32',
      visible:true,
    },
  ]
  }
  clickTextBox() {
    this.cssClass = 'btn'
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id:'1',
        showPopup : 'Yes',
        Name : this.name
      }
  };
    this.router.navigate(['/tabs/tab1'],navigationExtras);
  }

 public goBack(){
    this.slides.slidePrev();
  }
  skipBtn(){
    if (navigator.onLine) {
    if(this.name === undefined || this.name === null || this.name === ""){
      this.cssClass = 'btn3';
      this.placeName = 'Please Enter Your Full Name'
      setTimeout(() => {
        this.placeName = 'Enter Your Full Name';
        this.cssClass = 'btn';
     }, 2000);
    }
    else{
      this.corona.getDist().subscribe((data)=>{
        this.storage.set('covidData', data.Maharashtra.districtData.Akola);
      })
      this.date=' '+(new Date().toString()).replace(/\s/g, "").slice(0,17);
      console.log(this.date);
    let Records= {};
    Records['name'] = this.name;
    Records['cordovaversion'] = this.device.cordova;
    Records['model'] = this.device.model;
    Records['platform'] =  this.device.platform;
    Records['uuid'] = this.device.uuid;
    Records['version'] = this.device.version;
    Records['manufacturer'] = this.device.manufacturer;
    Records['isVirtual'] = this.device.isVirtual;
    Records['serial'] = this.device.serial;
    console.log(Records);
    this.storage.create();
    this.storage.set('onboarding', 'true');
    this.storage.set('name', this.name);
    this.firebase.collection('usersRegister').doc(this.name.toUpperCase()+ this.date ).set(Records)
    this.presentLoading();
  }
    } else {
      this.presentToast()
    }
  }
  
  slideChanged(e: any) {
    this.slides.getActiveIndex().then((index: number) => {
        this.index=index;
        console.log(this.index);
        
    });
}



  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please, turn on internet',
      position: 'top',
      duration: 2000,
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }
}