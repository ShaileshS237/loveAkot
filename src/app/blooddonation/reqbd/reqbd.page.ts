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
import { Device } from '@ionic-native/device/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-reqbd',
  templateUrl: './reqbd.page.html',
  styleUrls: ['./reqbd.page.scss'],
})
export class ReqbdPage implements OnInit {
  searchBarOn = false;
  todayDate: any;
  todayNews: any;
  nottodayNews: any;
  posts: any; contentLoaded = false;
  date: string;
  urgent :any;
  notUrgent: any;
  donarCout: number;
  constructor(
    private callNumber: CallNumber,
    private device: Device,public toastController: ToastController,public loadingController: LoadingController,
    private firestore:AngularFirestore,private menu: MenuController,private router: Router) { this.getNews()}

  ngOnInit() {
    this.todayDate = new Date();
  }
  getNews(){
  
    this.firestore.collection("BloodDonationRequest",ref=>ref.orderBy("timeStamp","asc")).snapshotChanges().subscribe(data=>{
      this.posts = data.map(e=>
        {
          return{
            id :e.payload.doc.id,
            Name: e.payload.doc.data()["Name"],
            Category:e.payload.doc.data()["Category"],
            Date:e.payload.doc.data()["Date"],
            MobNo:e.payload.doc.data()["MobNo"],
            address :e.payload.doc.data()["address"],
            Urgent :e.payload.doc.data()["Urgent"],
            message :e.payload.doc.data()["message"],
            Expiry :e.payload.doc.data()["Expiry"], 
            timeStamp :e.payload.doc.data()["timeStamp"],  
            uuid :e.payload.doc.data()["uuid"],     
          };
        }).filter(item =>item.Expiry>=this.todayDate)
        
        this.urgent = this.posts.filter(item =>item.Urgent=='Yes' );
        this.notUrgent = this.posts.filter(item =>item.Urgent=='No' );
        this.donarCout = Object.keys(this.posts).length;
        console.log( this.urgent);
        console.log(this.notUrgent );
        
        console.log(this.posts);
        
    })
  
    
  
  
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
deleteID(device:any,id:any){
  if(device == this.device.uuid) 
  {
    this.firestore.collection("BloodDonationRequest").doc(id).delete().then(() => {
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
    message: 'Sorry, You Can\'t edit',
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
  this.router.navigateByUrl('/blooddonation/reqbd/reqbdform');
}
}
