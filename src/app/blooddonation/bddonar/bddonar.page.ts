import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, MenuController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore'
import { HttpClientModule } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { FIRESEBASE_CONFIG,snapshotToArray } from '../../firebase';
import * as firebase from 'firebase';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as $ from 'jQuery' ;
import { CallNumber } from '@ionic-native/call-number/ngx';
import { bdgroups } from './bddonarform/dbgroup';
import { Device } from '@ionic-native/device/ngx';
import {Location} from '@angular/common';
@Component({
  selector: 'app-bddonar',
  templateUrl: './bddonar.page.html',
  styleUrls: ['./bddonar.page.scss'],
})
export class BddonarPage implements OnInit {
  eventSlides = {
    zoom: false,
    slidesPerView: 5.6,
    spaceBetween : 1,
    pagination: '.swiper-pagination',
   
  };
  posts: any; 
  donarCout: number;
  filetrData: any;
  
  bdData: { id: string; group: string; src: string; }[];
  constructor(
    private callNumber: CallNumber,public toastController: ToastController,private device: Device,public loadingController: LoadingController,
    private firestore:AngularFirestore,private menu: MenuController,private router: Router,
    private _location: Location,
    ) { 
      
      this.bdData = bdgroups;
      this.getNews()}

  ngOnInit() {
  }
  getNews(){
  
    this.firestore.collection("blooddonor",ref=>ref.orderBy("timeStamp","desc")).snapshotChanges().subscribe(data=>{
      this.posts = data.map(e=>
        {
          return{
            id :e.payload.doc.id,
            Name: e.payload.doc.data()["Name"],
            Category:e.payload.doc.data()["Category"],
            Date:e.payload.doc.data()["Date"],
            MobNo:e.payload.doc.data()["MobNo"],
            gender :e.payload.doc.data()["gender"],
            Allergy :e.payload.doc.data()["Allergy"],
            timeStamp :e.payload.doc.data()["timeStamp"],   
            available :e.payload.doc.data()["available"], 
            deviceid :e.payload.doc.data()["deviceid"],   
          };
        })
        
        console.log(this.posts);
        this.donarCout = Object.keys(this.posts).length;
        this.filetrData = this.posts;
        console.log(this.donarCout);

    })
  }
  filter(category){
    if(category ==='All'){
      this.filetrData = this.posts;
    }
    else{
    this.filetrData = this.posts.filter(x =>(x.Category == category));
    console.log(this.filetrData);
    this.donarCout = Object.keys(this.filetrData).length;
  }
    
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Something went wrong, Please Try Sometime',
      duration: 2000
    });
    toast.present();
  }
  callNum(number){
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => this.presentToast());
  }

  changeAvail(e:any,id:any,device:any){
    console.log(e);
    
    if(device == this.device.uuid) 
    {
      if(e.detail.checked== false){
        this.firestore.collection("blooddonor").doc(id).update({'available': false})
      } 
      else
      {
        this.firestore.collection("blooddonor").doc(id).update({'available': true})
      }   
    }
    else{
      
      this.errorToast();  
    }
  }

  deleteID(device:any,id:any){
    if(device == this.device.uuid) 
    {
      this.firestore.collection("blooddonor").doc(id).delete().then(() => {
        this.deleteDone()
    }).catch((error) => {
        
    });
    }
    else{
      this.errorToast2();
    }
  }

  async errorToast(){
      const toast = await this.toastController.create({
        message: 'Sorry, You Can\'t change status',
        duration: 2000
      });
      toast.present();
  }
  async errorToast2(){
    const toast = await this.toastController.create({
      message: 'Sorry, You Can\'t delete',
      duration: 2000
    });
    toast.present();
}
async deleteDone(){
  const toast = await this.toastController.create({
    message: 'Deleted',
    duration: 2000
  });
  toast.present();
}
addPost(){
  this.router.navigateByUrl('/blooddonation/bddonar/bddonarform');
}
}
