import {
  Component,
  ElementRef,
  OnInit
} from '@angular/core';
import {
  NavController,
  LoadingController,
  ToastController
} from '@ionic/angular';
import {
  Router,
  ActivatedRoute,
  NavigationExtras
} from '@angular/router';
import {
  AngularFirestore
} from '@angular/fire/firestore'
import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import {
  FIRESEBASE_CONFIG,
  snapshotToArray
} from '../../firebase';
import * as firebase from 'firebase';
import {
  ActionSheetController
} from '@ionic/angular';
import {
  AlertController
} from '@ionic/angular';
import {
  Location
} from "@angular/common";
import {
  AngularFireStorage
} from '@angular/fire/storage'
import {
  ViewChild
} from '@angular/core';
import { ImagecompressService } from 'src/app/services/imagecompress.service';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { Device } from '@ionic-native/device/ngx';
@Component({
  selector: 'app-postadd',
  templateUrl: './postadd.page.html',
  styleUrls: ['./postadd.page.scss'],
  })
export class PostaddPage implements OnInit {


  @ViewChild('myInput')
  myInputVariable: ElementRef;

  @ViewChild('btn')
  button: ElementRef;

  error: boolean = false;
  public id: any;
  class: string;
  textbox: boolean = true;
  yudsegment: string;
  name: any;
  message: any;
  date: string;
  image: any;
  path: any;
  rand: number;
  imagepath: string;
  ColorCode: string;
  timeStamp: Date;
  errorMsg: string;
  tImage: any;
  error2: boolean = false;
  disable: boolean = false;
  showClose: boolean = false;
  disabled: boolean = false;
  clicked: any = 0;
  box:any =0;
  progressbar: any = 0;
  language: any;
  randId: string;
  constructor(
    private storage: Storage,private device: Device,
    private location: Location, public toastController: ToastController,private loadingController: LoadingController,private httpClient:HttpClient,
    private firestore: AngularFirestore, private af: AngularFireStorage, ) {
      // this.box= this.message.value?.length;
      // console.log(this.box);
      
  }
  // onKeyUp(boxInput : HTMLInputElement){
  //   let length = boxInput.value.length ; //this will have the length of the text entered in the input box
  //   console.log();
  //   this.progressbar = length/400
  //   console.log(this.progressbar);
    
  // }
  viewImage() {
  
  }
  ngOnInit() {

    this.storage.create();
    
    this.storage.get('lang').then((val)=>{
      this.language = val;
      console.log(this.name);
      
    })
    this.storage.get('name').then((val)=>{
      this.name = val;
      console.log(this.name);
      
    })
    this.date = new Date().toString();
    this.timeStamp = new Date();
  }
  toggle() {
    this.textbox = false;
  }
  ionViewWillEnter() {
    this.yudsegment = "pizza";
  }
  clear() {
    this.tImage = undefined;
    this.showClose = false;
    this.imagepath = undefined;
    this.path = undefined;
  }
  upload($event) {
    let reader = new FileReader();
    this.tImage = $event.target.files[0];

    console.log(this.tImage);

    console.log('size', this.tImage.size);
    console.log('type', this.tImage.type);
    if (this.tImage.type === 'image/png' || this.tImage.type === 'image/jpeg') {
      if (this.tImage.size >= 2097152) {
        this.errorMsg = 'Please Select Image Less Than 2MB';
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
      this.errorMsg = 'Please Select Valid Image';
      this.presentToast(this.errorMsg);
      this.myInputVariable.nativeElement.value = "";
    }

  }
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
  uploadImage() {

  }
  async addPost() {
    
    if (this.name == undefined || this.name == '') this.error = true;
    else if ((this.message == undefined || this.message == '') && !this.tImage ) this.error2 = true
    else {
      this.clicked = 1;
      if (this.path) {
        this.randomId();
        console.log(this.path);
        this.rand = Math.floor(10000000 + Math.random() * 90000000);
        this.imagepath = "https://firebasestorage.googleapis.com/v0/b/loveakot-11975.appspot.com/o/Postimage%2FPost" + this.rand + "?alt=media", this.path;
        this.af.upload("/Postimage/Post" + this.rand, this.path)
        console.log(this.imagepath);
        console.log(this.rand);
      }
      let Records = {};
      Records['Name'] = this.name.toUpperCase();
      Records['date'] = this.date;
      Records['uuid'] = this.device.uuid;
      Records['Message'] = this.message.replace(/[&\\#,+()$~%.'":*?<>{}]/g, '');
      Records['likes'] = 0;
      if(this.message =='' ||this.message== undefined )
      Records['Message']='N.A'
      if (this.path){
      Records['fileName'] = this.rand;
      Records['image'] = this.imagepath;
    }
      Records['timeStamp'] = this.timeStamp;
      try {
        await this.firestore.collection("Posts").add(Records);
        this.push();
        this.presentLoading();
      } catch (error) {
        console.log(error)
      }
    }
    
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Adding Post, Please Wait...',
      duration: 3000
    });
    await loading.present();

    const {
      role,
      data
    } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.location.back();
  }
  noerror() {
    this.error = false;

  }
  noerror2() {
    this.error2 = false
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
      headings :{"en": 'Love ❤️ Akot'},
      contents: {"en": this.name +' यांनी काहीतरी पोस्ट केल....'},
      url:'https://loveakot.in/tabs/tab5',
      large_icon : 'https://firebasestorage.googleapis.com/v0/b/loveakot-11975.appspot.com/o/png.png?alt=media&token=cb8c26fa-36c5-4282-8d40-0d163ac410fe'
    };
    
    this.httpClient.post<any>('https://onesignal.com/api/v1/notifications',body, { headers }).subscribe((pushData=>{
      var obj = <any> pushData;
      console.log('pushYes',obj);
    }))
  }
}
