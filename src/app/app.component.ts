import { Component, NgZone, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { MenuController, NavController, Platform } from '@ionic/angular';
declare var jQuery: any;
import { LoadingController, AlertController, IonRouterOutlet } from '@ionic/angular';
import { FIRESEBASE_CONFIG,snapshotToArray } from './firebase';
import { Firebase } from '@ionic-native/firebase/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx'; 
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { interval, Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
import { CoronaService } from './services/corona.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { NewsdiscPage } from './information/newsdisc/newsdisc.page';
import { Tab2Page } from './tab2/tab2.page';
import { HttpClientModule } from '@angular/common/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

NgZone
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  {
  
  signal_app_id :string = 'cfa21f14-23d0-4be7-b1e5-58fcbb724be3';
  firebase_id:string = '1337526926';
  backButtonSubscription;
  private updateSubscription: Subscription;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  showError: boolean;
  click: number;
  val: any;
  swipeEnable: any;
  showModal: any;
  language: any;
  constructor(
    private appVersion: AppVersion,private ga: GoogleAnalytics,
    public corona:CoronaService,private zone:NgZone,public navCtrl: NavController,public loadingController: LoadingController,
    public platform: Platform, public toastController: ToastController, public storage:Storage,
    private location: Location,private oneSignal: OneSignal,private deeplinks: Deeplinks,
    public router:Router, public menuController:MenuController,public alertController: AlertController,
    private social:SocialSharing
    ) {
      
    this.initializeApp()
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

this.storage.create();
this.corona.langauge.subscribe(res=>{
  this.language = res
})
this.storage.get('showModal').then((val)=>{
      if(val=true!==undefined){
         
        this.showModal = false;
        
      }
      else{
        this.showModal = true;
      }
    })
  }
  // onsignal(){  
  //   this.oneSignal.startInit(this.signal_app_id,this.firebase_id);
  //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
  //   this.oneSignal.handleNotificationReceived().subscribe(data=>this.onPushRecived(data.payload));
  //   this.oneSignal.handleNotificationOpened().subscribe(data=>this.onPushOpened(data.notification.payload));
  //   this.oneSignal.endInit();
  // }
  initializeApp() {
  
    this.platform.ready().then(() => {
     
      this.backButtonEvent(); 
      this.pushToAppOnboarding();
      this.oneSignal.startInit(this.signal_app_id,this.firebase_id);
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationReceived().subscribe(data=>this.onPushRecived(data.payload));
      this.oneSignal.handleNotificationOpened().subscribe(data=>this.onPushOpened(data.notification.payload));
      this.oneSignal.endInit();
      
    });
  }

  ngAfterViewInit(){ 
    this.deeplinks.routeWithNavController(this.navCtrl,{
      '/newsdisc:id': 'newsdisc'
    }).subscribe((match)=>{ 
      // const internalpath =`/${match.$route}?${match.$args['id']}`;
     
      alert(JSON.stringify(match));
     let link = match.$link.path+'?'+match.$link.queryString;
     alert(link);
      this.presentLoading(link)
     
      // this.zone.run(()=>{
      //   alert(internalpath);
      //   this.router.navigateByUrl(internalpath)
      // })
    }, ( nomatch )=>{
      
    })
  }
  async presentLoading(link:any) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1000
    });
    await loading.present();
    this.router.navigateByUrl(link)
    const { role, data } = await loading.onDidDismiss();
    
    console.log('Loading dismissed!');
  }
  onPushRecived(data){

  }
  onPushOpened(data){

  }
  // setupDeeplink(){
  //   this.deeplinks.route({

  //   })
  // }
  async pushToAppOnboarding(){
    this.storage.create();
    this.storage.get('lang').then((val)=>{
      this.language = val
      console.log(val);
     })
    // this.storage.set('swipe','true')
    this.storage.get('lang').then((val)=>{
      if(!val){
       this.storage.set('lang','English');  
      }      
    })
    this.storage.get('onboarding').then((val)=>{
      if(val != 'true'){
        this.swipeEnable = val;
        
        this.router.navigate(['/onboarding']);  
      }      
    })
  }
  
  async about(){
    if(this.click!=1)
    {
      if(this.showError && this.click!=1){
        this.presentToastWithOptions()
        this.click=1;
        await this.menuController.close();
      }
      else{
      this.router.navigate(['/about']);
      await this.menuController.close();
      }
    }
    
  }
  async help(){
    if(this.click!=1)
    { if(this.showError){
      this.presentToastWithOptions()
      this.click=1;
      await this.menuController.close();
    }
    else{
      this.router.navigate(['/help']);
      await this.menuController.close();
    } }
   
    
  }
  async setting(){
    if(this.click!=1)
    {
      if(this.showError){
        this.presentToastWithOptions()
        this.click=1;
        await this.menuController.close();
      }
      else{
       
      this.router.navigate(['/setting']);
      await this.menuController.close();
      } 
    }
  
    
  }
  async contact(){
    if(this.click!=1)
    {
      if(this.showError){
        this.presentToastWithOptions()
        this.click=1;
        await this.menuController.close();
      }
      else{
       
      this.router.navigate(['/contact']);
      await this.menuController.close();
      } 
    }
  
    
  }
  async home(){
   
    this.router.navigate(['/tabs/tab1']);
        await this.menuController.close();
  }
  async feedback(){
    if(this.click!=1)
    {
      if(this.showError){
        this.presentToastWithOptions()
        this.click=1;
        await this.menuController.close();
      }
      else{
         
      this.router.navigate(['/feedback']);
      await this.menuController.close();
      } 
    }
  
  
  }
  async infocon(){
    if(this.click!=1)
    {
      if(this.showError){
        this.presentToastWithOptions()
        this.click=1;
        await this.menuController.close();
      }
      else{
        this.router.navigate(['/infocon']);
          await this.menuController.close();
      }  
    }
   
    
  
  }
  async moneycon(){
    if(this.click!=1)
    {
      if(this.showError){
        this.presentToastWithOptions()
        this.click=1;
        await this.menuController.close();
      }
      else{
        this.router.navigate(['/moneycon']);
        await this.menuController.close();
      } 
      
    }
    
    
  }
  async openPlay(){
    window.location.href = 'https://play.google.com/store/apps/details?id=com.loveakot';
  }
  shareApp(){
    var options = {
      message: 'Download The LoveAkot App', // not supported on some apps (Facebook, Instagram)
      url: 'https://play.google.com/store/apps/details?id=com.loveakot',
    };
    this.social.shareWithOptions(options);
  }
  backButtonEvent() {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        }
        else if (
          this.router.url === "/tabs/tab2" ||
          this.router.url === "/tabs/tab3" ||
          this.router.url === "/tabs/tab4" ||
          this.router.url === "/tabs/tab5" ||
          this.router.url === "/tabs/tab1"

        ) {
          navigator["app"].exitApp();
        }
        // else if (
        //   this.router.url === "/tabs/tab1"
        // ) {
        //   navigator["app"].exitApp();
        // }
      });
    });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: 'Are you sure, you want to exit?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            navigator["app"].exitApp();
          }
        }
      ]
    });
    await alert.present();
  }
  ngOnDestroy() {
    // Unregister the custom back button action for this page
    this.backButtonSubscription.unsubscribe();
  }
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'No Internet!',
      position: 'bottom',
      buttons: [
         {
          icon: 'close-outline',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.click=0;
          }
        }
      ]
    });
    toast.present();
  }

}
