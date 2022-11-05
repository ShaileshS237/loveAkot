import { doctors } from 'src/app/shared/json/doctors';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, MenuController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore'
import { HttpClientModule } from '@angular/common/http';
import { FIRESEBASE_CONFIG,snapshotToArray } from '../firebase';
import * as firebase from 'firebase';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as $ from 'jQuery' ;
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PopoverComponent } from './popover/popover.component';
import { PopoverController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-catlist',
  templateUrl: './catlist.page.html',
  styleUrls: ['./catlist.page.scss'],
})
export class CatlistPage implements OnInit {
  data: any;
  title: any;
  category:any;
  posts:any;
  id: any;
  noData:any = false;
  cid: any;
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
  images: { id: string; image: any; active: any; }[];
  titleM: any;
  language: any;
  constructor(
    public popoverController: PopoverController,private photoViewer: PhotoViewer,public storage:Storage,
    private router: Router ,private route: ActivatedRoute,private firestore:AngularFirestore,) {
    
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.cid = params.id;
        this.title = params.Title;
        this.titleM = params.TitleM;
      }
    });
  }
  navigate2(id: string, title: string,titleM:any) {
    // tslint:disable-next-line: align
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'id': this.cid,
        'Title': this.title,
    }
  };
    this.router.navigate(['/infocon/infocondetail'], navigationExtras);
  }

  ngOnInit() {
    this.storage.get('lang').then((val)=>{
      this.language = val
      console.log('container',val);
     })
    this.getData();
    this.getBannerImage()
  }
  viewImage(img:any){
this.photoViewer.show(img);
  }
  getBannerImage() {
    this.firestore.collection('CityCategory',).doc(this.cid).collection('adImage').snapshotChanges().subscribe(data => {
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


  getData(){
    try {
      this.firestore.collection('CityCategory').doc(this.cid).collection('All '+this.title,ref=>ref.orderBy("Name","desc")).snapshotChanges().subscribe(data=>{
        this.posts = data.map(e=>
          {
            return{
              id :e.payload.doc.id, 
              Name:e.payload.doc.data()["Name"],
              About:e.payload.doc.data()["About"],
              Address:e.payload.doc.data()["Address"],
              Mobile:e.payload.doc.data()["Mobile"],
              StartTime:e.payload.doc.data()["StartTime"],
              EndTime:e.payload.doc.data()["EndTime"],
              imageId:e.payload.doc.data()["imageId"],
              uuid:e.payload.doc.data()["uuid"],
              off:e.payload.doc.data()["off"],
            };        
          })
          console.log(this.posts);
          var count = Object.keys(this.posts).length;
         if(count==0){
          this.noData = true;
         }
      })
      
    } catch (error) {
      // console.log(error);
      
    }
      
  }
  navigate(id: string, title: string,category:string,About:string,Address:string,Mobile:string,StartTime:string,EndTime:string,imageId:any,uuid:any,off:any) {
    // tslint:disable-next-line: align
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'id': id,
        'NameM':this.titleM,
        'catid' : this.cid,
        'Name':title,
        'Category':category,
        'About' : About,
        'Address': Address,
        'Mobile':Mobile,
        'StartTime' : StartTime,
        'EndTime':EndTime,
        'imageId':imageId,
        'uuid':uuid,
        'off': off
    }
  };
    this.router.navigate(['/catlist/catlistdetail'], navigationExtras);
  }




  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
