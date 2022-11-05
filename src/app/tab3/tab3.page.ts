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
import { Observable, interval, Subscription } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { CoronaService } from '../services/corona.service';
// import { CoronaService } from 'git/src/app/services/corona.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],

})
export class Tab3Page implements OnInit {
  
  searchBarOn = false;
  loading: boolean = true

  posts: any;
   contentLoaded = false;
  date: string;
  daysSlides = {
    zoom: false,
    slidesPerView: 1.2,
    spaceBetween : 0,
    pagination: '.swiper-pagination',
   
  };
  todayDate: string;
  todayNews: any;
  nottodayNews: any;
  booksCollectionRef: any;
  approveNews: any;
  fetch: boolean=true;
  noToday: boolean = false;
  noOther: boolean = false;
  showError:boolean=false;
  private updateSubscription: Subscription;
  stopLoading: boolean;
  name: any;
  language: any;
  DateTime: Date;
  ngOnInit(){
    
  }
  constructor(private firestore:AngularFirestore,private menu: MenuController,private router: Router,
    public toastController: ToastController , public storage:Storage,public corona:CoronaService,
    ) {
      this.storage.get('lang').then((val)=>{
        this.language = val
        console.log('container',val);
        
       })
      this.corona.langauge.subscribe(res=>{
        this.language = res
      })
     
      this.storage.get('name').then((val)=>{
        this.name = val;
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
  this.storage.get('lang').then((val)=>{
    this.language = val
    console.log('SHAILESH',val);
   })
    this.DateTime = new Date();
    this.todayDate = new Date().toString();
    this.todayDate = this.todayDate.substring(0,15)
    console.log(this.todayDate);
    
  }
ionViewWillEnter()
{
  this.getNews();
  if(!navigator.onLine){
    this.showError = true;
   }
}

onLoad() {
  this.loading = false;
}
getNews(){
  try {
    this.firestore.collection('News',ref=>ref.orderBy("timeStamp","desc")).snapshotChanges().subscribe(data=>{
      this.posts = data.map(e=>
        {
          return{
            id :e.payload.doc.id,
            Description: e.payload.doc.data()["Description"],
            Title:e.payload.doc.data()["Title"],
            ContName:e.payload.doc.data()["ContName"],
            image:e.payload.doc.data()["image_url"],
            Approve :e.payload.doc.data()["Approve"],
            Date :e.payload.doc.data()["date"],
            timeStamp :e.payload.doc.data()["timeStamp"],
            count :e.payload.doc.data()["count"],
          };        
        })
        this.noToday = false;
        this.noOther = false;

        this.approveNews = this.posts.filter(item=>item.Approve === 'yes' );
        this.todayNews = this.approveNews.filter(item =>item.Date.substring(0,15) === this.todayDate ).slice(0,4);
        this.nottodayNews = this.approveNews.filter(item =>item.Date.substring(0,15) !== this.todayDate).slice(0,7);
        console.log( this.todayNews);
        console.log(this.nottodayNews );
        var count = Object.keys(this.posts).length;
        var count2 = Object.keys(this.todayNews).length;
        var count3 = Object.keys(this.nottodayNews).length;
        console.log(count2);
        this.contentLoaded = true;
        if(count2===0){
          this.noToday = true;
        }
        if(count3===0){
          this.noOther = true;
        }
        if (count=== 0) this.fetch = false;
        setTimeout(()=>{
        
        },3000);
        if(this.todayNews){
          this.stopLoading = true;
        }
    })
  
  } catch (error) {
    console.log('error',error);
    
  }
  
  
  
  
}
  toggle()
  { 
    if(this.searchBarOn == false)
    this.searchBarOn = true;
    else
    this.searchBarOn = false
    
  }
  navigate(id: string, title: string,disc:string,image:string,date:any,count:any,ContName:any) {
    // tslint:disable-next-line: align
    count++;
    this.firestore.collection('News').doc(id).update({
      count  : count
    })
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id" : id,
        // "page" : 'tab3',
    }
  };
 
    this.router.navigate(['/newsdisc'], navigationExtras);
  }




moreNews(id: any){

    let navigationExtras :NavigationExtras ={
    queryParams:{
      "id": id,
    }
  };
  this.router.navigate(['/newsdisc/categorynews'], navigationExtras);

}
async presentToast() {
  const toast = await this.toastController.create({
    message: 'No More More News Available',
    duration: 2000
  });
  toast.present();
}

}
