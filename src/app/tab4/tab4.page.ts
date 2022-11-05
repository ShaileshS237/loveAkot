import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, MenuController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore'
import { HttpClientModule } from '@angular/common/http';
import { Post } from '../model/post.model';
import { FIRESEBASE_CONFIG,snapshotToArray } from '../firebase';
import * as firebase from 'firebase';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as $ from 'jQuery' ;
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Network, } from '@ionic-native/network/ngx';
import { interval, Subscription } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
   
  posts: any; 
  showAdd: any;
  onGoing: any;
  upComing: any;
  todayDate: any;
  showOngoing: boolean = true;
  contentLoaded: boolean;
  noToday: boolean = false;
  noOther: boolean = false;
  onGoingAll: any;
  onGoingAllCount: number;
  private updateSubscription: Subscription;
  showError: boolean;
  stopLoading: boolean;
  language: any;
  constructor(
    private network: Network,public toastController: ToastController, public storage: Storage,
    private firestore:AngularFirestore,private menu: MenuController,private router: Router) { 
      this.storage.get('lang').then((val)=>{
        this.language = val
        
       })
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
      
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        console.log('network was disconnected :-(');
      });
      
      // stop disconnect watch
      disconnectSubscription.unsubscribe();
      
      
      // watch network for a connection
      let connectSubscription = this.network.onConnect().subscribe(() => {
        console.log('network connected!');
        // We just got a connection but we need to wait briefly
         // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            console.log('we got a wifi connection, woohoo!');
          }
        }, 3000);
      });
      
      // stop connect watch
      connectSubscription.unsubscribe();
    }
  eventSlides = {
    zoom: false,
    slidesPerView: 1.8,
    spaceBetween : 1,
    pagination: '.swiper-pagination',
   
  };
  ngOnInit() {
    
    this.todayDate = new Date();
    this.todayDate = Date.parse(this.todayDate);
    // console.log('today',this.todayDate);
    console.log('timeStamp',this.todayDate);
    this.getNews();
   
  }

  
  onClick(){
    this.menu.toggle();
  }

getNews(){

this.firestore.collection('Events',ref=>ref.orderBy("start_date","asc")).snapshotChanges().subscribe(data=>{
  this.posts = data.map(e=>
    {
      return{
        id :e.payload.doc.id, 
        about: e.payload.doc.data()["about"],
        contName: e.payload.doc.data()["ContName"],
        eTitle: e.payload.doc.data()["Event_Title"],
        oTime: e.payload.doc.data()["OpenTime"],
        eTime: e.payload.doc.data()["CloseTime"],
        address: e.payload.doc.data()["address"],
        eDate: e.payload.doc.data()["end_date"],
        sDate: e.payload.doc.data()["start_date"],
        image: e.payload.doc.data()["image"],
        
      };        
    })
    this.noToday = false;
    this.noOther = false;
    console.log('all',this.posts);
    var count3 = Object.keys(this.posts).length;
    console.log('All',count3);
    
    var date = new Date(this.todayDate).toLocaleDateString("en-us")
    console.log(date);
    this.upComing = this.posts.filter(item=>(item.sDate > this.todayDate) && (new Date(item.sDate).toLocaleDateString("en-us") != new Date(this.todayDate).toLocaleDateString("en-us") && new Date(this.todayDate).toLocaleDateString("en-us") != new Date(item.eDate).toLocaleDateString("en-us")) );
    this.onGoing = this.posts.filter(item=>(new Date(item.sDate).toLocaleDateString("en-us") == new Date(this.todayDate).toLocaleDateString("en-us") && new Date(this.todayDate).toLocaleDateString("en-us") == new Date(item.eDate).toLocaleDateString("en-us")) ||(item.sDate <= this.todayDate && this.todayDate <= item.eDate)).slice(0,4) ;
    this.onGoingAll = this.posts.filter(item=>(new Date(item.sDate).toLocaleDateString("en-us") == new Date(this.todayDate).toLocaleDateString("en-us") && new Date(this.todayDate).toLocaleDateString("en-us") == new Date(item.eDate).toLocaleDateString("en-us")) ||(item.sDate <= this.todayDate && this.todayDate <= item.eDate)).slice(4,)
    // if{}
    this.onGoingAllCount = Object.keys(this.onGoingAll).length;
    console.log(this.onGoingAllCount);
    
    console.log('event',this.upComing);
    console.log('onGoing', this.onGoing);
    var count = Object.keys(this.upComing).length;
    var count2 = Object.keys(this.onGoing).length;
    console.log(count);
    console.log(count2);
    
    if(this.posts){
      this.stopLoading = true;
    }
    this.contentLoaded = true;
    if(count===0){
      this.noToday = true;
    }
    if(count2===0){
      this.noOther = true;
    }
})
  
  
}
connection(){
  
}
navigate(allData:any) {
  if(this.onGoingAllCount == 0){
    this.presentToast();
  }
else{
  // tslint:disable-next-line: align
  let navigationExtras: NavigationExtras = {
    queryParams: {
      id: JSON.stringify(allData)
    }
};
  this.router.navigate(['/events/allevents'], navigationExtras);
}
}
navigate2(allData:any) {
  // tslint:disable-next-line: align
  let navigationExtras: NavigationExtras = {
    queryParams: {
      id: JSON.stringify(allData)
    }
};
  this.router.navigate(['/events'], navigationExtras);
}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'No More Events Available',
    duration: 2000
  });
  toast.present();
}

}

