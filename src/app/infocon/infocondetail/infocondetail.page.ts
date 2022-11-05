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
import { Device } from '@ionic-native/device/ngx'
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-infocondetail',
  templateUrl: './infocondetail.page.html',
  styleUrls: ['./infocondetail.page.scss'],
})
export class InfocondetailPage implements OnInit {
  data: any;
  title: any;
  path: any;
  rand: number;
  imagepath: string;
  Title: any;
  Description: any;
  date: any;
  ContName: any;
  timeStamp: Date;
  Name: any;
  Mobile: any;
  startTime: any;
  endTime: any;
  address: any;
  about: any;
  imageID: any;
  Disabled: boolean=false;
  off: any;
  name: any;
  language: any;
  constructor(private route: ActivatedRoute,private location:Location,private device: Device,public storage:Storage,
    private firestore:AngularFirestore,private af:AngularFireStorage,private loadingController:LoadingController) { 
    this.date = new Date().toString();
    this.timeStamp = new Date();
    this.storage.get('name').then((val)=>{
      this.ContName = val;
    })
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.data = params.id;
        this.title = params.Title;
      }
    });
  }
  upload($event){
    this.path = $event.target.files[0];
}
  ngOnInit() {
    this.storage.get('lang').then((val)=>{
      this.language = val

      
     })
  }
  async createDeatils(){
    this.rand = Math.floor(1000 + Math.random() * 9000);
    this.imagepath = "https://firebasestorage.googleapis.com/v0/b/loveakot-11975.appspot.com/o/Newsimage%2FNews"+this.rand+"?alt=media",this.path;
    this.af.upload("/Newsimage/News"+this.rand,this.path)
    console.log(this.imagepath);
    console.log(this.rand);
    console.log(this.af.upload("/Newsimage/News"+this.rand,this.path));
      let Records = {};
      Records['Name'] = this.Name;
      Records['Mobile'] = this.Mobile;
      Records['StartTime'] = this.startTime;
      Records['EndTime'] = this.endTime;
      Records['off'] = this.off;
      Records['ContName'] = this.ContName;
      Records['Address'] = this.address;
      Records['About'] = this.about;
      Records['Date'] = this.date;
      Records['TimeStamp'] = this.timeStamp;
      Records['Category'] = this.title;
      Records['uuid'] = this.device.uuid;
      if(this.path){
        Records['imageId'] = this.imagepath;
      }
      else{
      Records['imageId'] = '/assets/1.jpg';
    }
      // Records['Approve'] = 'No';
     
      console.log(Records);
      
       try {
         
        await this.firestore.collection('CityCategory').doc(this.data).collection('All '+ this.title).doc(this.Name).set(Records);
        this.presentLoading();
       } catch (error) {
        console.log(error) 
       }
   }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Adding Entry, Please Wait...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.location.back(); 
  
  }
}
