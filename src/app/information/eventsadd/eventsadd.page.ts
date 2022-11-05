import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore'
import { HttpClientModule } from '@angular/common/http';
import { FIRESEBASE_CONFIG,snapshotToArray } from '../../firebase';
import * as firebase from 'firebase';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import {AngularFireStorage} from '@angular/fire/storage'
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-eventsadd',
  templateUrl: './eventsadd.page.html',
  styleUrls: ['./eventsadd.page.scss'],
})
export class EventsaddPage implements OnInit {
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
  language: any;
  constructor( private location:Location,public storage:Storage,
    private firestore:AngularFirestore,private af:AngularFireStorage,private loadingController:LoadingController,
    ) {
      this.storage.get('lang').then((val)=>{
        this.language = val
        
       })
     }

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
    this.rand = Math.floor(1000000 + Math.random() * 9000000);
    this.imagepath = "https://firebasestorage.googleapis.com/v0/b/loveakot-11975.appspot.com/o/Eventimage%2FEvent"+this.rand+"?alt=media",this.path;
    
    this.af.upload("/Eventimage/Event"+this.rand,this.path)
    console.log(this.imagepath);
    console.log(this.rand);
    
    console.log(this.af.upload("/Newsimage/News"+this.rand,this.path));
    
      let Records = {};
      Records['Event_Title'] = this.EventName;
      Records['ContName'] = this.MobNo;
      Records['start_date'] = new Date(this.Startdate).getTime();
      Records['end_date'] = new Date(this.endDate).getTime();;
      Records['OpenTime'] = this.openTime;
      Records['CloseTime'] = this.CloseTime;
      Records['address'] = this.address;
      Records['about'] = this.about;
      if (this.path == undefined) {
        Records['image'] = '/assets/1.jpg'
      } else {
        Records['image'] = this.imagepath;
      }
     
      Records['Timestamp'] = this.timeStamp;

      console.log(Records);
      
       try {
        await this.firestore.collection("Events").add(Records);
        this.presentLoading();
       } catch (error) {
        console.log(error) 
       }
   }
   async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Adding Event, Please Wait...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.location.back(); 
  }
}
