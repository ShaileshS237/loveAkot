import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, MenuController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore'
import { HttpClientModule } from '@angular/common/http';
import * as firebase from 'firebase';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as $ from 'jQuery' ;
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Network, } from '@ionic-native/network/ngx';
import { interval, Subscription } from 'rxjs';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-bdcamp',
  templateUrl: './bdcamp.page.html',
  styleUrls: ['./bdcamp.page.scss'],
})
export class BdcampPage implements OnInit {
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
  constructor(private network: Network,public toastController: ToastController,private callNumber: CallNumber,
    private firestore:AngularFirestore,private menu: MenuController,private router: Router,
    private photoViewer: PhotoViewer) { }

  ngOnInit() {
    this. getNews();
  }
  call(number){
    console.log(number);
    
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
   
    .catch(err => console.log('Error launching dialer', err));
  }

  viewPhoto(img:any){
    this.photoViewer.show(img);

  }
  getNews(){

    this.firestore.collection('Blood Donation Camp',ref=>ref.orderBy("start_date","desc")).snapshotChanges().subscribe(data=>{
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
        console.log('all',this.posts);
        var count3 = Object.keys(this.posts).length;
        console.log('All',count3);
        // this.upComing = this.posts.filter(item=>(item.sDate > this.todayDate) && (new Date(item.sDate).toLocaleDateString("en-us") != new Date(this.todayDate).toLocaleDateString("en-us") && new Date(this.todayDate).toLocaleDateString("en-us") != new Date(item.eDate).toLocaleDateString("en-us")) );
        // this.onGoing = this.posts.filter(item=>(new Date(item.sDate).toLocaleDateString("en-us") == new Date(this.todayDate).toLocaleDateString("en-us") && new Date(this.todayDate).toLocaleDateString("en-us") == new Date(item.eDate).toLocaleDateString("en-us")) ||(item.sDate <= this.todayDate && this.todayDate <= item.eDate)).slice(0,4) ;
        // this.onGoingAll = this.posts.filter(item=>(new Date(item.sDate).toLocaleDateString("en-us") == new Date(this.todayDate).toLocaleDateString("en-us") && new Date(this.todayDate).toLocaleDateString("en-us") == new Date(item.eDate).toLocaleDateString("en-us")) ||(item.sDate <= this.todayDate && this.todayDate <= item.eDate)).slice(4,)
        // if{}
        // this.onGoingAllCount = Object.keys(this.onGoingAll).length;
        // console.log(this.onGoingAllCount);
        
        // console.log('event',this.upComing);
        // console.log('onGoing', this.onGoing);
        // var count = Object.keys(this.upComing).length;
        // var count2 = Object.keys(this.onGoing).length;
        // console.log(count);
        // console.log(count2);
        
        
        // this.contentLoaded = true;
        // if(count===0){
        //   this.noToday = true;
        // }
        // if(count2===0){
        //   this.noOther = true;
        // }

    })
}
}