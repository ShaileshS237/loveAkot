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
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-bddonarform',
  templateUrl: './bddonarform.page.html',
  styleUrls: ['./bddonarform.page.scss'],
})
export class BddonarformPage implements OnInit {
  date: any;
  gender: any;
  Category: any;
  MobNo: any;
  Name: any;
  clicked: any = 0;
  Allergy: any;
  timeStamp: Date;
  constructor(
    public toastController: ToastController,private device: Device,public loadingController: LoadingController,
    private firestore:AngularFirestore,private af:AngularFireStorage,private router:Router,private _location: Location) { 
    this.date = new Date().toString();
    this.timeStamp = new Date()
  }

  ngOnInit() {
  }

  async createNews(){
      let Records = {};
      Records['Name'] = this.Name;
      Records['MobNo'] = this.MobNo;
      Records['deviceid'] = this.device.uuid;
      Records['Category'] = this.Category;
      Records['available'] = true;
      Records['gender'] = this.gender;
      Records['Date'] = this.date;
      Records['Allergy'] = this.Allergy;
      if(this.Allergy === undefined || this.Allergy === '')
      Records['Allergy'] = 'N.A'
      Records['timeStamp'] = this.timeStamp;
      console.log(Records);
      
       try {
        this.clicked = 1;
        await this.firestore.collection("blooddonor").doc(this.Name.toUpperCase()).set(Records);
        this.presentLoading()
       
        
       } catch (error) {
        console.log(error) 
       }
   }
   
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Thankyou '+this.Name,
      duration: 2000
    });
    toast.present();
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
    this.presentToast();
    this._location.back();
    
  }
}
