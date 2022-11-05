import { Component, OnInit } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage-angular';
import { AppComponent } from '../app.component';
import { LoadingController, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { CoronaService } from '../services/corona.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {
  newsStaus: any;
  LocalLanguage:any;
  EnglishD:any;
  MarathiD:any;
  reloadFirst:any = true;
  // newsStaus: any;
show:any = false;
  Language: any;
  name: any;
  img1: string;
  img2: string;
  constructor(
    private router: Router,private corona:CoronaService,public toastController: ToastController,
    private storage: Storage,private oneSignal: OneSignal,public appComponent:AppComponent,public loadingController: LoadingController) { }

  ngOnInit() {
    this.storage.get('name').then((val)=>{
      this.name = val;
    })
   if(this.reloadFirst){
    this.reloadFirst = false;
    
   }
   
    this.storage.create();
    this.storage.get('lang').then((val)=>{
      this.LocalLanguage = val;
      if (val == 'English') {
        this.EnglishD = true; 
        this.img1 = '/assets/lang/1.jpg'
        this.img2 = '/assets/lang/4.jpg'
      } else {
        this.MarathiD = true;
        this.img1 = '/assets/lang/2.jpg'
        this.img2 = '/assets/lang/3.jpg'
      }
    })
    this.storage.get('notificationStatus').then((val)=>{  
      this.newsStaus = val;
    })
   
  }
  toggelTheme(event){
    console.log(event);
    if(event.detail.checked)
    document.body.setAttribute('color-theme','dark')
    else
    document.body.setAttribute('color-theme','light')
  }
  newsNotification(event){
    if (event.detail.checked) {
      this.storage.set('notificationStatus',true); 
      // this.appComponent.onsignal();
    } else {
      this.storage.set('notificationStatus',false); 
      this.oneSignal.setSubscription(false);
    }
  }
  postsNotification(event){
    console.log(event);
  }
  otherNotification(event){
    console.log(event);
  }



  languageChangeEnglish()
  {
    this.corona.setLang('English')
    this.storage.set('lang','English')
    this.presentLoading2() 
  }
  languageChangeMarathi()
  {
    this.corona.setLang('Marathi')
    this.storage.set('lang','Marathi')
    this.presentLoading()
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Changing Language, Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'id': 1,
    }
  };
    this.router.navigate(['/tabs/tab1'],navigationExtras)
  }
  async presentLoading2() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'भाषा बदलवीत आहे, कृपया वाट पाहा.',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'id': 1,
    }
  };
    this.router.navigate(['/tabs/tab1'],navigationExtras)
  }


  showFooter(){
    this.show = true;
  }

  changeName(){
    this.storage.set('name',this.name)
    this.show = false;
    this.presentToast();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Name Updated',
      duration: 2000
    });
    toast.present();
  }
  close(){
    this.show = false;
  }
}
