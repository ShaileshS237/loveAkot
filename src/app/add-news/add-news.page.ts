import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Post } from '../model/post.model';
import { FIRESEBASE_CONFIG,snapshotToArray } from '../firebase';
import * as firebase from 'firebase';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import {AngularFireStorage} from '@angular/fire/storage'
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { FcmService } from '../fcm.service';
import { tap } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.page.html',
  styleUrls: ['./add-news.page.scss'],
})
export class AddNewsPage {
  @ViewChild('myInput')
  myInputVariable: ElementRef;

  @ViewChild('btn')
  button: ElementRef;

  showButtons=true;
  showTextBox=false;
  post = {} as Post;
  date: any;
  Title: any;
  Description: any;
  ContName: any;
  image: any;
  date2: any;
  path:string;
  imagepath:string;
  rand: number;
  clicked: any = 0;
  tImage2 = 'https://img.pngio.com/index-of-wp-content-uploads-job-manager-uploads-companylogo-2018-08-thumbnail-png-992_680.png'
  errorMsg: string;
  tImage: any;
  showClose: boolean;
  language: any;
  Patrakar: any;
  randId: string;
  timeStamp: any;
    constructor(public toastController: ToastController,private camera: Camera,private storage: Storage,
      private location:Location,private localNotifications: LocalNotifications,private httpClient:HttpClient,
      private firestore:AngularFirestore,private af:AngularFireStorage,private loadingController:LoadingController) {
       this.date = new Date().toString();
       this.timeStamp = new Date();
      console.log(this.date);
      this.storage.create();
      this.getPatrakar()
      this.storage.get('name').then((val)=>{
        this.ContName = val;
        console.log(this.ContName);
        
      })
      this.storage.get('lang').then((val)=>{
        this.language = val
        console.log('container',val);
        
       })
    }
    upload($event){
      let reader = new FileReader();
      this.tImage = $event.target.files[0];
  
      console.log(this.tImage);
  
      console.log('size', this.tImage.size);
      console.log('type', this.tImage.type);
      if (this.tImage.type === 'image/png' || this.tImage.type === 'image/jpeg') {
        if (this.tImage.size >= 2097152) {
          this.errorMsg = 'Please Select Image Less Than 2MB';
          this.tImage = undefined
          this.tImage2 = 'https://img.pngio.com/index-of-wp-content-uploads-job-manager-uploads-companylogo-2018-08-thumbnail-png-992_680.png'
          this.presentToast(this.errorMsg);
          this.myInputVariable.nativeElement.value = "";
        } else {
          this.showClose = true;
          reader.readAsDataURL(this.tImage)
          reader.onload = () => {
            this.tImage = reader.result;
          };
          this.path = this.tImage;
        }
      } else {
        this.tImage2 = 'https://img.pngio.com/index-of-wp-content-uploads-job-manager-uploads-companylogo-2018-08-thumbnail-png-992_680.png'
        this.tImage = undefined
        this.errorMsg = 'Please Select Valid Image';
        this.presentToast(this.errorMsg);
        this.myInputVariable.nativeElement.value = "";
      }
  
    }
    clear() {
      this.tImage = undefined;
      this.showClose = false;
      this.imagepath = undefined;
      this.path = undefined;
      this.myInputVariable.nativeElement.value = "";
    }
    // captureImage(){
    //   const options: CameraOptions = {
    //     quality: 100,
    //     destinationType: this.camera.DestinationType.FILE_URI,
    //     encodingType: this.camera.EncodingType.JPEG,
    //     mediaType: this.camera.MediaType.PICTURE
    //   }
      
    //   this.camera.getPicture(options).then((imageData) => {
    //    // imageData is either a base64 encoded string or a file URI
    //    // If it's base64 (DATA_URL):
    //    this.tImage = 'data:image/jpeg;base64,' + imageData;
    //    alert(this.tImage)
    //   }, (err) => {
    //    // Handle error
    //   });
    // }
async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  async presentToast2() {
    const toast = await this.toastController.create({
      message: 'Your Name Required',
      duration: 2000
    });
    toast.present();
  }
   async createNews(){
    if(this.path!=undefined){
      console.log(this.path);
      
    this.rand = Math.floor(1000 + Math.random() * 9000);
    this.imagepath = "https://firebasestorage.googleapis.com/v0/b/loveakot-11975.appspot.com/o/Newsimage%2FNews"+this.rand+"?alt=media",this.path;
    
    this.af.upload("/Newsimage/News"+this.rand,this.path)
    console.log(this.imagepath);
    console.log(this.rand);
    
    console.log(this.af.upload("/Newsimage/News"+this.rand,this.path));
    this.clicked = 1;
      let Records = {};
      Records['Title'] = this.Title;
      Records['Description'] = this.Description;
      Records['date'] = this.date;
      Records['timeStamp'] = this.timeStamp;
      Records['ContName'] = this.ContName;
      Records['count'] = 0;
      console.log(this.Patrakar.findIndex(x=> x.Name === this.ContName));
      if( this.Patrakar.findIndex(x=> x.Name === this.ContName)>=0){
        Records['Approve'] = 'yes';
      }
      else{
      Records['Approve'] = 'no';
    }
      Records['image_url'] = this.imagepath;
      Records['count'] = '0';
      console.log(Records);
      
       try {
        await this.firestore.collection("News").doc(this.Title).set(Records)
        this.presentLoading();
        this.push();
       } catch (error) {
        console.log(error) 
       }
    }
    else
    {
      this.clicked = 1;
      this.imagepath = "assets/news.jpg";
      let Records = {};
      Records['Title'] = this.Title;
      Records['Description'] = this.Description;
      Records['date'] = this.date;
      Records['timeStamp'] = this.timeStamp;
      Records['ContName'] = this.ContName;
      Records['count'] = 0;
      console.log(this.Patrakar.findIndex(x=> x.Name === this.ContName));
      
      if(this.Patrakar.findIndex(x=> x.Name === this.ContName)>=0){
        Records['Approve'] = 'yes';
      }
      else{
      Records['Approve'] = 'no';
    }
      Records['image_url'] = this.imagepath;
      // Records['count'] = '0';
      console.log(Records);
      
       try {
         this.randomId();
        await this.firestore.collection("News").doc(this.randId).set(Records)
        this.presentLoading();
        this.push();
       } catch (error) {
        console.log(error) 
       }
      
    }
   }
   MobileUpload(){
     
   }
   internetUpload(){
    this.showTextBox=true;
    this.showButtons=false;
   }
 async presentLoading() {
    if (this.language == 'English') {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Adding News, Please Wait...',
        duration: 3000
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
      this.location.back(); 
    } else {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'बातमी टाकत आहे, कृपया वाट पाहा',
        duration: 3000
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
      this.location.back(); 
    }
  }
  notification(){
    
  }
  getPatrakar(){
    this.firestore.collection('Patrakar').snapshotChanges().subscribe(data=>{
      this.Patrakar = data.map(e=>
        {
          return{
            id :e.payload.doc.id, 
            Name: e.payload.doc.data()["Name"],
           
          };        
        })
       console.log(this.Patrakar);
    })
    }
    
    randomId(){
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
      this.randId = "";
      const lengthOfCode = 20;
      for (let i = 0; i < lengthOfCode; i++) {
        this.randId  += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      console.log(this.randId);
      
    }
  push(){
    const headers = { 'Content-Type' : 'application/json', 'Authorization': 'Basic MTBiNWJjODctZmJhMC00NGQzLTgxOGUtMWFjZTc5OGEzNGVk' };
    const body = {
      app_id: "cfa21f14-23d0-4be7-b1e5-58fcbb724be3",
      included_segments: ["Test User"],
      data: {"foo": "bar"},
      contents: {"en": this.Title},
      headings :{"en": '📰 News!!'},
      big_picture:'https://firebasestorage.googleapis.com/v0/b/loveakot-11975.appspot.com/o/defaultCat.jpg?alt=media&token=6317006e-6872-4fc1-bda4-d463b8c54214 ',
      large_icon : 'https://firebasestorage.googleapis.com/v0/b/loveakot-11975.appspot.com/o/png.png?alt=media&token=cb8c26fa-36c5-4282-8d40-0d163ac410fe',
      url:'  https://loveakot.in/newsdisc?id='+this.randId,
    };
    console.log(body);
    
    this.httpClient.post<any>('https://onesignal.com/api/v1/notifications',body, { headers }).subscribe((pushData=>{
      var obj = <any> pushData;
      console.log('pushYes',obj);
    }))
  }
}