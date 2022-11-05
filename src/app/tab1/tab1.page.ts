import { Component,Directive,ElementRef,Input,OnInit, Renderer2, ViewChild } from '@angular/core';
import Typewriter from 't-writer.js'
import { ModalController, AlertController, MenuController, DomController } from '@ionic/angular';
import { CoronaService } from '../services/corona.service';
import { Device } from '@ionic-native/device/ngx';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore'
import { FIRESEBASE_CONFIG,snapshotToArray } from '../firebase';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import {ChangeDetectorRef} from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { interval, Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { animate, style, transition, trigger } from '@angular/animations';
import { DeviceidService } from '../service/deviceid.service';
import { city_category2 } from '../json_files/category copy';
import { localizedString } from '@angular/compiler/src/output/output_ast';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
// @Directive({
//   selector:'[appHideHeader]'
// })
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
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
export class Tab1Page implements OnInit {
  // @ViewChild('content') elementView: ElementRef;
  // @Input('appHideHeader') toolbar:any;
  private toolbarHeight = 44;
  districts: any;
  a:any;
  r:any;
  d:any;
  c:any;
  localVacine:any
  place:string="";
  type:string="";
  icon:string="";
  temp: string ="";
  disc: any;
  temp2: string;
  icon_type: any;
  cordovaversion: string;
  model: string;
  platform: string;
  uuid: string;
  platfromversion: string;
  man: string;
  isVer: boolean;
  serial: string;
  coronaData:any;
  greet:any;
  showError:boolean = false; 
  // ?pincode=444101&date=06-05-2021
  vacineAvail = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin'
  vacineData = 'https://github.com/owid/covid-19-data/blob/master/public/data/vaccinations/vaccinations.json';
  private updateSubscription: Subscription;
  list: any;
  count: number;
  Disable: boolean;
  localCovid: any;
  images:any;
  la: any;
  lr: any;
  lc: any;
  ld: any;
  rr: any;
  cc: any;
  dd: any;
  name: any;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    zoom: false,
    slidesPerView: 1,
    spaceBetween : 5,
    autoplay: {
      delay: 3000,
    },
    pagination: true,
  };
  slideOpts3 = {
    initialSlide: 0,
    speed: 400,
    zoom: false,
    slidesPerView: 0.5,
    spaceBetween : 1,
    
    pagination: true,
  };
  slideOpts4 = {
    // initialSlide: 0,s
    speed: 400,
    zoom: false,
    slidesPerView: 1,
    // pagination: false, 
    
    
  };
  slideOpts2 = {
    initialSlide: 0,
    speed: 400,
    zoom: false,
    slidesPerView: 4.8,
    spaceBetween : 2,
    pagination: true,
  };
  localTempData: Object;
  tempData: Object;
  locaTempratureData: any;
  data: any;
  language: any;
  daysSlides = {
    zoom: false,
    slidesPerView: 1.2,
    spaceBetween : 0,
    pagination: '.swiper-pagination',
   
  };
  news: { id: string; Description: any; Title: any; ContName: any; image: any; Approve: any; Date: any; count: any; }[];
  stopLoading: boolean;
  category: any;
  contentHeight: any;
  name2: void;
  covidVac: any;
  covidVacD: any;
  location:any;
  constructor(
    private rendrer:Renderer2,
    private domCtrl :DomController,
    private router: Router,
    public platform2: Platform,
    public toastController: ToastController,
    private uniqueDeviceID: UniqueDeviceID,
    private cd : ChangeDetectorRef,
    private social:SocialSharing,
    private device: Device,
    private firestore:AngularFirestore,
    private storage: Storage,
    private menu: MenuController,
    private menuCtrl : MenuController,
    public corona : CoronaService,
    private httpClient:HttpClient,
    private photoViewer: PhotoViewer,
    private route: ActivatedRoute,
    private nameDevice:DeviceidService,
    private ga: GoogleAnalytics

    ) 
    
    {

      

      // this.randomId();
      // console.log(this.nameDevice.getName());
      // this.corona.langauge.subscribe(res=>{
      //   console.log('res',res);
      // })
      // this.storage.create();
      this.storage.get('lang').then((val)=>{
        this.language = val
        console.log('container',val);
        this.Data(this.language)
        
       })
      this.corona.langauge.subscribe(res=>{
        this.language = res
        this.Data(this.language)
      })
     
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.location = params.id;
         this.storage.get('name').then((val)=>{
          this.name = val;
          // console.log(val);
        })
      
      }
    });
      // this.nameDevice.getDevice()
    
      
      this.localVacine = city_category2;
      this.getCategory();
      this.getNews();
      this.GetCurrentTemp2(21.097336,77.053566);
      this.route.queryParams.subscribe(params => {
        if (params && params.id) {
          this.data = params.id,
          this.name = params.Name
          // console.log(this.name);
          
          // this.title = params.title;
          console.log('data',this.name);
        }
      });  
      this.storage.get('name').then((val)=>{
        this.name = val;
      })
  //     this.ga.startTrackerWithId('G-WF6SE7RZB5')
  //  .then(() => {
  //    console.log('Google analytics is ready now');
  //     this.ga.trackView(this.name);
  //     // alert('done')
  //    // Tracker is ready
  //    // You can now track pages or set additional information such as AppVersion or UserId
  //  })
  //  .catch(e => 
  //   console.log('Error starting GoogleAnalytics', e)
   
  //  );
      this.updateSubscription = interval(1000).subscribe
      (
        (val) => 
        { 
          if(navigator.onLine){
            this.showError = false;
           }
           else{
             this.showError = true;
           }
        }
      );
  
  }
  // function makeRandom(lengthOfCode: number, possible: string) {
  //   let text = "";
  //   for (let i = 0; i < lengthOfCode; i++) {
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));
  //   }
  //     return text;
  // }
  // let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
  // const lengthOfCode = 40;
  // makeRandom(lengthOfCode, possible);

 
  Data(language){
    var myDate = new Date();
        var hrs = myDate.getHours();
       if(language == 'Marathi'){
        if (hrs < 12)
        this.greet = 'शुभ सकाळ';
     else if (hrs >= 12 && hrs <= 17)
       this.greet = 'शुभ  दुपार';
     else if (hrs >= 17 && hrs <= 24)
        this.greet = 'शुभ संध्याकाळ';
       }
       else{
        if (hrs < 12)
        this.greet = 'Good Morning,';
     else if (hrs >= 12 && hrs <= 17)
       this.greet = 'Good Afternoon,';
     else if (hrs >= 17 && hrs <= 24)
        this.greet = 'Good Evening,';
       }
       
  }
//Get Banner Image From Firestore
ngOnInit():void {
  console.log('ngOnInit');
  
  this.storage.create()
  this.storage.get('lang').then((val)=>{
    this.language = val
    // console.log('container',val);
  
      const target = document.querySelector('.tw');
    const writer = new Typewriter(target, {
      loop: true,
      typeSpeed: 40,
      deleteSpeed: 60,
      typeColor: '#00f3ff'
    })
    
    writer
    .rest(1)
      .type('News.')
      .rest(500)
      .clear()
      .type('Events.')
      .rest(500)
      .clear()
      .type('Restaurants.')
      .rest(500)
      .clear()
      .type('Doctors.')
      .rest(500)
      .clear()
      .type('Medicals.')
      .rest(500)
      .clear()
      .changeOps({ typeSpeed: 40 })
      .type('And Many More.')
      .rest(1000)
      .clear()
      .start()
  
    
  
 
   })
   this.getData();
   this.getBannerImage();
   this.menu.swipeGesture(true); 
 
}
  getBannerImage() {
    this.firestore.collection('homeImage').snapshotChanges().subscribe(data => {
      this.images = data.map(e => {
        return {
          id: e.payload.doc.id,
          image: e.payload.doc.data()["image"],
          active: e.payload.doc.data()["active"],
        };
      }).filter(item =>item.active == 'yes');
      // console.log(this.images);
    })
  }


//Geting Covid Information from API  



 
  getData(){
    this.corona.getDist().subscribe((data)=>{
      this.districts = data.Maharashtra.districtData.Akola; 
      // console.log('coviddata',this.districts);
      this.a = this.districts.active;
      this.r = this.districts.recovered;
      this.c = this.districts.confirmed;
      this.d = this.districts.deceased;
      this.rr = '↑'+ this.districts.delta.recovered;
      this.cc = '↑'+ this.districts.delta.confirmed;
      this.dd = '↑'+ this.districts.delta.deceased;
      this.storage.set('covidData',this.districts); 
      this.storage.get('covidData').then((val)=>{
      this.localCovid = val;
      // console.log(this.localCovid);
      this.la = this.localCovid.active;
      this.lr = this.localCovid.recovered;
      this.lc = this.localCovid.confirmed;
      this.ld = this.localCovid.deceased;
      this.storage.set('covidData',this.districts); 
      })

    })
   
  }
  GetCurrentTemp(lattitude,longitude){
    if(navigator.onLine) { // true|false
      var url="https://api.openweathermap.org/data/2.5/weather?lat="+lattitude+"&lon="+longitude+"&APPID=13cfb20ec7ea8db78a0f71bb68722bb9";
      this.httpClient.get(url).subscribe((tempraturedata)=>{
        this.storage.set('locaTempratureData', tempraturedata);
      })
  }

}

GetCurrentTemp2(lattitude,longitude){
  var d = new Date();
  var url2= "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=444101&date="+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
  this.httpClient.get(url2).subscribe((data)=>{
    this.covidVac = data;
    this.covidVacD = this.covidVac.centers
    // console.log(this.covidVacD);
    
  })

  if(navigator.onLine) { // true|false
    var url="https://api.openweathermap.org/data/2.5/weather?lat="+lattitude+"&lon="+longitude+"&APPID=13cfb20ec7ea8db78a0f71bb68722bb9";
    this.httpClient.get(url).subscribe((tempraturedata)=>{
      var obj = <any> tempraturedata;
      // console.log(obj);
      
      this.weatherIcon(obj.weather[0].icon);
        this.temp = ((parseFloat(obj.main.temp)-273.15).toFixed(0)).toString()+"°C";
        this.temp2 = ((parseFloat(obj.main.feels_like)-273.15).toFixed(2)).toString()+"°c";
    })
}

}
  getDeviceList(){
    try {
      this.firestore.collection('Device').snapshotChanges().subscribe(data=>{
        this.list = data.map(e=>
          {
            return{
              id :e.payload.doc.id,
              uid: e.payload.doc.data()["uid"],
            };        
          })
          // console.log(this.list);
          this.count = Object.keys(this.list).length;
        //  console.log(this.count);
         
      })
    } catch (error) {
      // console.log('error',error);
      
    }
    
  }

    
  



  weatherIcon(icon_type)
  {
    switch (icon_type) {
        case '01d':
            this.icon = "https://bmcdn.nl/assets/weather-icons/all/clear-day.svg"
            break;
        case '01n':
          this.icon = "https://bmcdn.nl/assets/weather-icons/all/clear-night.svg"
            break;
        case '02d':
          this.icon = "https://bmcdn.nl/assets/weather-icons/all/partly-cloudy-day.svg"
            break;
        case '02n':
          this.icon = "https://bmcdn.nl/assets/weather-icons/all/partly-cloudy-night.svg"
            break;
        case '03d':
          this.icon = "https://bmcdn.nl/assets/weather-icons/all/cloudy.svg"
            break;
        case '03n':
          this.icon = "https://bmcdn.nl/assets/weather-icons/all/cloudy.svg"
            break;
        case '04d':
          this.icon = "https://bmcdn.nl/assets/weather-icons/all/overcast.svg"
            break;
        case '04n':
          this.icon = "https://bmcdn.nl/assets/weather-icons/all/overcast.svg"
            break;
        case '09d':
          this.icon = "https://bmcdn.nl/assets/weather-icons/all/rain.svg"
            break;
        case '09n':
          this.icon = "https://bmcdn.nl/assets/weather-icons/all/rain.svg"
            break;
        case '10d':
          this.icon = "https://bmcdn.nl/assets/weather-icons/all/partly-cloudy-day-rain.svg"
            break;
        case '10n':
          this.icon = "https://bmcdn.nl/assets/weather-icons/all/partly-cloudy-night-rain.svg"
            break;
        case '11d':
          this.icon = "https://bmcdn.nl/assets/weather-icons/all/thunderstorms-day.svg"
            break;
        case '11n':
          this.icon = "https://bmcdn.nl/assets/weather-icons/all/thunderstorms-night.svg"
            break;
        case '50d':
          this.icon = "https://bmcdn.nl/assets/weather-icons/all/clear-day.svg"
            break;
        case '50n':
          this.icon = "https://bmcdn.nl/assets/weather-icons/all/clear-night.svg"
            break;
    }
  }



shareApp(){
  if (this.language == 'English') {
    var options = {
      message: 'Download The LoveAkot App\n', // not supported on some apps (Facebook, Instagram)
      url: 'https://play.google.com/store/apps/details?id=com.loveakot',
    };
    this.social.shareWithOptions(options);
  } else {
    var options = {
      message: 'LoveAkot अ‍ॅप डाउनलोड करा\n', // not supported on some apps (Facebook, Instagram)
      url: 'https://play.google.com/store/apps/details?id=com.loveakot',
    };
    console.log(options);
    
    this.social.shareWithOptions(options);
  }
}


  bloodDonation(){
    if(this.showError){
      this.presentToast();
    }
    else{
      this.router.navigate(['/blooddonation']);
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: '<ion-icon name="wifi-outline"></ion-icon>No internet, Please Turn on Internet',
      duration: 2000
    });
    toast.present();
  }

  infoCon(image)
    {
      if(image == '/assets/contri.jpg'){
        this.router.navigate(['/infocon']); 
      }
      else
      {
        this.photoViewer.show(image);
      }
    }



    onClickend(){
      this.menuCtrl.open('end');
    }
    onClick(){
      this.menuCtrl.toggle();
    }
    openCustom() {
      this.menuCtrl.enable(true, 'custom');
      this.menuCtrl.open('custom');
    }

    getCategory(){
 
      this.firestore.collection('CityCategory',ref=>ref.orderBy("title","asc").limit(9)).snapshotChanges().subscribe(data=>{
        this.category = data.map(e=>
          {
            return{
              id :e.payload.doc.id, 
              img: e.payload.doc.data()["img"],
              title:e.payload.doc.data()["title"],
              titleM:e.payload.doc.data()["titleM"],
              active:e.payload.doc.data()["active"],
            
            };        
          }).filter(x =>(x.active =='true'));

          this.category.forEach(element => {
           if(element.title=='Beauty Parlour'){
             element.pincode = '444101'
           }
          });
          if(Object.keys(this.category).length){
            this.stopLoading = true;
          }
        //  console.log(this.category);
        //  this.category = this.category.filter(x =>(x.title !='Banks') && (x.title !='Doctors') );
        //  console.log(this.category);
          
         
      })
    }
    navigate(id: string, title: string,titleM:any) {
      if(title === 'Doctors'){
        let navigationExtras: NavigationExtras = {
          queryParams: {
            'id': id,
            'Title':title,
            
        }
      };
        this.router.navigate(['/doctor'], navigationExtras);
      
      }
      else{
      let navigationExtras: NavigationExtras = {
        queryParams: {
          'id': id,
          'Title':title,
          'TitleM':titleM,
      }
    };
      this.router.navigate(['/catlist'], navigationExtras);
    }
  }
    getNews(){
      try {
        this.firestore.collection('News',ref=>ref.orderBy("date","asc").limit(4)).snapshotChanges().subscribe(data=>{
          this.news = data.map(e=>
            {
              return{
                id :e.payload.doc.id,
                Description: e.payload.doc.data()["Description"],
                Title:e.payload.doc.data()["Title"],
                ContName:e.payload.doc.data()["ContName"],
                image:e.payload.doc.data()["image_url"],
                Approve :e.payload.doc.data()["Approve"],
               Date :e.payload.doc.data()["date"],
               count : e.payload.doc.data()["count"],
                          
              };        
            }).filter(item=>item.Approve === 'yes' )
        
            setTimeout(()=>{
            
            },3000);
            if(this.news){
              this.stopLoading = true;
            }
        })
      
      } catch (error) {
        // console.log('error',error);
        
      }
      
      
      
      
    }

   async disabled(){
      if (this.language == 'English') {
        const toast = await this.toastController.create({
          message: 'Currently, Not available',
          duration: 2000,
         
        });
        toast.present();
      } else {
        const toast = await this.toastController.create({
          message: 'सध्या उपलब्ध नाही',
          cssClass:'marathi',
          duration: 2000
        });
        toast.present();
      }
    }
}
