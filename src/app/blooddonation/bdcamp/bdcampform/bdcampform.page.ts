
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore'
import { HttpClientModule } from '@angular/common/http';
// import { FIRESEBASE_CONFIG,snapshotToArray } from ';
import * as firebase from 'firebase';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import {AngularFireStorage} from '@angular/fire/storage'

@Component({
  selector: 'app-bdcampform',
  templateUrl: './bdcampform.page.html',
  styleUrls: ['./bdcampform.page.scss'],
})
export class BdcampformPage implements OnInit {
  showButtons=true;
  showTextBox=false;
  date: any;
  Title: any;
  Description: any;
  ContName: any;
  image: any;
  date2: any;
  path:string;
  imagepath:string;
  rand: number;
  address: any;
  MobNo: any;
  Startdate: any;
  EventName: any;
  endDate: any;
  messgae: any;
  openTime: any;
  about: any;
  CloseTime: any;
  timeStamp: Date;
  timeStamp2: () => string;
  Disabled: boolean=false;
  constructor( private location:Location,
    private firestore:AngularFirestore,private af:AngularFireStorage,private loadingController:LoadingController,
    ) { }

  ngOnInit() {
     this.timeStamp = new Date();
     this.timeStamp2 = new Date().toDateString;
  }
  upload($event){
    this.path = $event.target.files[0];
  }
  uploadImage(){
  
  }
  
  async createEvent(){
    this.Disabled = true;
    console.log(this.path);
    this.rand = Math.floor(1000 + Math.random() * 9000);
    this.imagepath = "https://firebasestorage.googleapis.com/v0/b/loveakot-11975.appspot.com/o/Eventimage%2FEvent"+this.rand+"?alt=media",this.path;
    
    this.af.upload("/Eventimage/Event"+this.rand,this.path)
    console.log(this.imagepath);
    console.log(this.rand);
    
    console.log(this.af.upload("/Newsimage/News"+this.rand,this.path));
    
      let Records = {};
      Records['Event_Title'] = this.EventName;
      Records['ContName'] = this.MobNo;
      Records['start_date'] = new Date(this.Startdate).getTime();
      // Records['end_date'] = new Date(this.endDate).getTime();;
      Records['OpenTime'] = this.openTime;
      // Records['CloseTime'] = this.CloseTime;
      Records['address'] = this.address;
      // Records['about'] = this.about;
      if (this.path == undefined) {
        Records['image'] = '/assets/event.jpg'
      } else {
        Records['image'] = this.imagepath;
      }
      Records['about'] = this.about;
      Records['Timestamp'] = this.timeStamp;

      console.log(Records);
      
       try {
        await this.firestore.collection("Blood Donation Camp").doc(this.EventName).set(Records);
        this.presentLoading();
       } catch (error) {
        console.log(error) 
       }
   }
   async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Adding Camp Details, Please Wait...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.location.back(); 
  }
}
