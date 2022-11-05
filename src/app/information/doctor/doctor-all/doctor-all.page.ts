import { doctors } from 'src/app/shared/json/doctors';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, MenuController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore'
import { HttpClientModule } from '@angular/common/http';
import { FIRESEBASE_CONFIG,snapshotToArray } from '../../../firebase';
import * as firebase from 'firebase';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as $ from 'jQuery' ;
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-doctor-all',
  templateUrl: './doctor-all.page.html',
  styleUrls: ['./doctor-all.page.scss'],
  animations: [
    trigger('fade', [      
      transition('void => *', [
        style({opacity: 0}),
        animate(1000, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(1000, style({opacity: 0}))
      ])
    ])

] 
})
export class DoctorAllPage implements OnInit {
  data: string;
  title: string;
  posts: any;
  catDoc: any;
  bImage: any;
  Name: any;
  Review: any;
  emoji: any;
  star: any;
  date: any;
  timeStamp: any;
  yesReview: boolean;
  id: number;
  stopLoading: boolean;
  listCount: any;
  constructor(
    private loadingController:LoadingController,
    public toastController: ToastController,public storage:Storage,
    private menu: MenuController,private router: Router ,private route: ActivatedRoute,private firestore:AngularFirestore,) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.data = params.id;
        this.title = params.title;
        this.bImage = params.bannerImage

      }
    });
    
  }

  ngOnInit() {
    this.getNews();
  }
  addDoc(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.title
      }
  };
    this.router.navigate(['/doctor/doctor-all/doctor-dis/adddoctors'], navigationExtras);
  }
  navigate(allData:any) {
    // tslint:disable-next-line: align
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(allData)
      }
  };
    this.router.navigate(['/doctor/doctor-all/doctor-dis'], navigationExtras);
  }
  getNews(){
    // ,ref=>ref.orderBy("date","asc")
    this.firestore.collection('Doctors').snapshotChanges().subscribe(data=>{
        this.posts = data.map(e=>
          {
            return{  
              id :e.payload.doc.id,
              name: e.payload.doc.data()["name"],
              degree:e.payload.doc.data()["degree"],
              fees:e.payload.doc.data()["fees"],
              exp:e.payload.doc.data()["exp"],
              mTime1 :e.payload.doc.data()["mTime1"],
              mTime2 :e.payload.doc.data()["mTime2"],
              eTime1:e.payload.doc.data()["eTime1"],
              eTime2 :e.payload.doc.data()["eTime2"],
              off:e.payload.doc.data()["off"],
              MobNo:e.payload.doc.data()["MobNo"],
              address:e.payload.doc.data()["address"],
              sex:e.payload.doc.data()["sex"],
              category:e.payload.doc.data()["category"],
            };        
            
          })
          this.catDoc = this.posts.filter(item =>item.category === this.title );
          var count = Object.keys(this.catDoc).length;
          if(count>0){
           this.listCount = false;
          }
          setTimeout(() => {
            if(this.posts){
              this.stopLoading = true;
            }
          }, 1000);
          
          // console.log(this.catDoc);
      })
    
    
    
      
  }

}
