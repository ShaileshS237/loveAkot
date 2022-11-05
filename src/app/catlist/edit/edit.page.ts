import { doctors } from 'src/app/shared/json/doctors';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, MenuController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore'
import { HttpClientModule } from '@angular/common/http';
import { FIRESEBASE_CONFIG,snapshotToArray } from '../../firebase';
import * as firebase from 'firebase';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as $ from 'jQuery' ;
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { Storage } from '@ionic/storage-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  cid: any;
  Name: any;
  cat: any;
  address: any;
  Mobile: any;
  about: any;
  StartTime: string;
  EndTime: string;
  startTime: any;
  endTime: any;
  cateName: any;
  nid: any;
  error: boolean;
  Disabled: boolean;
  off: any;
 

  constructor(
    private _location: Location,
    public actionSheetController: ActionSheetController,private storage: Storage,private photoViewer: PhotoViewer,
    private loadingController:LoadingController,private callNumber: CallNumber,private sms: SMS,public alertController: AlertController,
    public toastController: ToastController,private router: Router ,private route: ActivatedRoute,private firestore:AngularFirestore,) {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.nid = params.nid,
        this.cid = params.title;
        this.cateName = params.cateName;
        this.Name = params.id;
        this.cat = params.Category;
        this.address = params.Address
        this.Mobile = params.Mobile
        this.about = params.About
        // this. = params.cat
        this.startTime = params.StartTime
        this.endTime = params.EndTime
        this.off = params.off
        console.log(this.startTime);
        console.log(this.endTime);
      }
    });

    

   }
  

  ngOnInit() {
  }
  update(){
    if(this.endTime<=this.startTime){
   this.error = true
    }

    else{

      this.Disabled = true;
    // this.firestore.collection('CityCategory').doc(this.data).collection('All '+ this.title).doc(this.Name).set(Records);
    this.firestore.collection('CityCategory').doc(this.cateName).collection('All '+ this.cat).doc(this.nid).update({
      'About': this.about,
      'Address':this.address,
      // 'ContName':,
      'EndTime': this.endTime,
      'Mobile': this.Mobile,
      'Name':this.Name,
      'StartTime':this.startTime,


    }).then(() => {
      this.presentLoading()
    
      
  });
  }
}

click(){
  this.error = false
}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Successfully updated!',
    duration: 2000
  });
  toast.present();
}

    
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.presentToast()
    window.history.go(-2);
  }

}
