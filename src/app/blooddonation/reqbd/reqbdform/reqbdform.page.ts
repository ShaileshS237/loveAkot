import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore'
import { HttpClientModule } from '@angular/common/http';
import {Location} from '@angular/common';
import { FIRESEBASE_CONFIG,snapshotToArray } from '../../../firebase';
import * as firebase from 'firebase';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {AngularFireStorage} from '@angular/fire/storage'
import { HttpClient } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';
@Component({
  selector: 'app-reqbdform',
  templateUrl: './reqbdform.page.html',
  styleUrls: ['./reqbdform.page.scss'],
})
export class ReqbdformPage implements OnInit {
  showButtons=true;
  showTextBox=false;
 
  date: any;
  Name: any;
  MobNo: any;
  Category: any;
  address: any;
  date2: any;
  path:string;
  message:string;
  rand: number;
  timeStamp: Date;
  Urgent: any;
  disabled: boolean;
  constructor(public loadingController: LoadingController,
    private httpClient:HttpClient,private device: Device,
    private firestore:AngularFirestore,private af:AngularFireStorage,private router:Router,private _location: Location) { 
    this.date = new Date().toString();
    this.timeStamp = new Date();
    
  }

  ngOnInit() {
  }
  async createNews(){
    this.disabled = true;
    console.log(this.path);
    this.rand = Math.floor(1000 + Math.random() * 9000);
    // this.imagepath = "https://firebasestorage.googleapis.com/v0/b/loveakot-11975.appspot.com/o/Newsimage%2FNews"+this.rand+"?alt=media",this.path;
    
    // this.af.upload("/Newsimage/News"+this.rand,this.path)
    // console.log(this.imagepath);
    console.log(this.rand);
    
    // console.log(this.af.upload("/Newsimage/News"+this.rand,this.path));
    
      let Records = {};
      Records['Name'] = this.Name;
      Records['MobNo'] = this.MobNo;
      Records['Urgent'] = this.Urgent;
      Records['Category'] = this.Category;
      Records['address'] = this.address;
      Records['uuid'] = this.device.uuid;
      Records['Date'] = this.date;
     if(this.message == undefined || this.message == null){
      Records['message'] ='N.A';
     }
     else{
      Records['message'] = this.message;
     }
      Records['timeStamp'] = this.timeStamp;
      Records['Expiry'] = this.timeStamp.setDate(this.timeStamp.getDate()+5);
      console.log(Records);
       try {
        await this.firestore.collection("BloodDonationRequest").doc(this.Name).set(Records);
        this.presentLoading()
        if(this.Urgent == 'Yes'){
        this.push()
      }
       
       } catch (error) {
        console.log(error) 
       }
   }
   push(){
    const headers = { 'Content-Type' : 'application/json', 'Authorization': 'Basic MTBiNWJjODctZmJhMC00NGQzLTgxOGUtMWFjZTc5OGEzNGVk' };
    const body = {
      app_id: "cfa21f14-23d0-4be7-b1e5-58fcbb724be3",
      included_segments: ["Subscribed Users"],
      data: {"foo": "bar"},
      contents: {"en": this.Name +' urgently want '+ this.Category.toUpperCase() +' blood, You can donate blood...'},
      headings :{"en": '🩸 Emergency!!'},
      priority :10,
      
    };
    console.log(body);
    
    this.httpClient.post<any>('https://onesignal.com/api/v1/notifications',body, { headers }).subscribe((pushData=>{
      var obj = <any> pushData;
      console.log('pushYes',obj);
    }))
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Adding, Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this._location.back();
  }

}
