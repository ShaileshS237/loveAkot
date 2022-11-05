import { doctors } from 'src/app/shared/json/doctors';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, MenuController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras, NavigationEnd, RoutesRecognized } from '@angular/router';
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
import { ThrowStmt } from '@angular/compiler';
import { Device } from '@ionic-native/device/ngx';
import {Location} from '@angular/common';
import { RouterExtServiceService } from 'src/app/services/router-ext-service.service';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-catlistdetail',
  templateUrl: './catlistdetail.page.html',
  styleUrls: ['./catlistdetail.page.scss'],
  animations: [
    trigger('fade', [      
      transition('void => *', [
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(300, style({opacity: 0}))
      ])
    ])

]
})
export class CatlistdetailPage implements OnInit {
  id: any;
  yesReview: boolean = false;
  service: boolean = true;
  title: any;
  Name: any;
  Review: any;
  emoji: any;
  star: any;
  date: string;
  timeStamp: any;
  cid: any;
  cat: any;
  posts: { id: string; Description: any; Title: any; ContName: any; image: any; Approve: any; Date: any; count: any; }[];
  review: any;
  count: number;
  five: number=0;
  four: number=0;
  three: number=0;
  two: number=0;
  one: number=0;
  total: any;
  FiveCount: number;
  FourCount: number;
  ThreeCount: number;
  TwoCount: number;
  OneCount: number;
  Address: any;
  About: any;
  Mobile: any;
  StartTime: any;
  EndTime: any;
  CName: any;
  error: boolean;
  error2: boolean;
  clicked: number;
  catId: any;
  imageId: any;
  stime: any;
  etime: any;
  Name2: any;
  uuid: any;
  previousUrl: string;
  page: any;
  off: any;
  language: any;
  CatM: any;
  constructor(
    private device: Device,private routerExtService: RouterExtServiceService,
    public actionSheetController: ActionSheetController,private storage: Storage,private photoViewer: PhotoViewer,private _location: Location,
    private loadingController:LoadingController,private callNumber: CallNumber,private sms: SMS,public alertController: AlertController,
    public toastController: ToastController,private router: Router ,private route: ActivatedRoute,private firestore:AngularFirestore,) {
      
      this.storage.get('lang').then((val)=>{
        this.language = val
        console.log('container',val);
       })
      this.route.queryParams.subscribe(params => {
   
      // this.goToPrevious();
      console.log();
    
      if (params && params.id) {

        this.cid = params.id;
        this.CatM = params.NameM;
        this.catId = params.catid;
        this.CName = params.Name;
        this.cat = params.Category;
        this.Address = params.Address
        this.Mobile = params.Mobile
        this.About = params.About
        this.imageId = params.imageId
        this.stime = params.StartTime
        this.etime = params.EndTime
        this.uuid = params.uuid
        this.off = params.off
        if(parseInt(params.StartTime) == 12){
          this.StartTime = params.StartTime+ " PM"
        }
        else{
          this.StartTime = params.StartTime+ " AM"
        }
        
        if(parseInt(params.EndTime) == 12){
          this.EndTime = params.EndTime+ " AM"
        }
        if(parseInt(params.EndTime) >12){
          this.EndTime = parseInt(params.EndTime)%12 +':'+ params.EndTime.slice(3,5)+ " PM"
        }
        else{
          this.EndTime = params.EndTime+ " PM"
        }


        if(this.Address == undefined)
      this.Address ='Not Available';
      if(this.Mobile == undefined)
      this.Mobile ='Not Available';
      if(this.About == undefined)
      this.About ='Not Available';
      if(this.StartTime == 'undefined AM')
      this.StartTime ='Not Available';
      if(this.EndTime == 'undefined PM')
      this.EndTime ='Not Available';
      
// console.log(this.Address);
// console.log(this.Address);
      }
    });

    

   }
  
   openPhoto(img){
    this.photoViewer.show(img);
   }



  ngOnInit() {
   
              
    this.storage.create();
      this.storage.get('name').then((val)=>{
        this.Name = val;
        this.Name2 = val;
        console.log(this.Name);
        
      })
    this.getReviews();
    this.date = new Date().toString();
    this.timeStamp = new Date();
  }
  addClass(id: any,src:any) {
    this.id = id;
    this.star = id;
    this.emoji = src;
   this.yesReview = true;
  //  console.log(this.star);
  //  console.log(this.emoji )
   
}
clear(){
  this.error2 = false
}
notNow(){
  this.yesReview =false;
  this.id = 0;
  this.error2 = false
}
submitReview(){
  this.yesReview =false;
  this.id = 0;
  this.presentToast();
}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Thankyou for your Review',
    duration: 2000
  });
  this.error2=false;  
  this.yesReview =false;
  this.clicked = 0;
  this.id = 0;
  this.Name=this.Name2;
  this.Review=""
  toast.present();
}
sendSMS(number2){
  this.sms.send(number2, 'Hello world!');
}
async doyouWant2(number){
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: 'Do You Really Want To Send SMS?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Yes',
        handler: () => {
          this.sendSMS(number);
        }
      }
    ]
  });


  await alert.present();
}
async doyouWant(number){
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: 'Do You Really Want To Call?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Yes',
        handler: () => {
          this.callNum(number);
        }
      }
    ]
  });


  await alert.present();
}

callNum(number){
this.callNumber.callNumber(number, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
}
// /doctors/KyQAtjQrgAsXpEVzOCzj/rating;
async createReview(){
  if(this.Review==undefined || this.Review == '') this.error2=true
  else {
    this.clicked = 1;
    let Records = {};
    if(this.Name === undefined || this.Name=='')
     Records['Name'] = 'Anonymous';
    else Records['Name'] = this.Name;
    Records['Review'] = this.Review;
    Records['Emoji_Link'] = this.emoji;
    Records['Star'] = this.star;
    Records['Date'] = this.date;
    Records['TimeStamp'] = this.timeStamp;
    console.log(Records);
    
     try {
     
      this.presentLoading(Records);
     } catch (error) {
      console.log('error',error) 
     }
    }
 }
 async presentLoading(Records:any) {

  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Adding Review, Please Wait...',
    duration: 3000
  });
 
 
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  await this.firestore.collection('CityCategory').doc(this.catId).collection('All '+this.cat).ref.doc(this.cid).collection("/review").add(Records);
  console.log('Loading dismissed!');
  this.presentToast();
  
}
testReview(){
  let Records = {};
  if(this.Name === undefined)Records['Name'] = 'Anonymous';
    else Records['Name'] = this.Name;
  Records['Review'] = this.Review;
  Records['Emoji_Link'] = this.emoji;
  Records['Star'] = this.star;
 
  console.log(Records);
}

getReviews(){
  this.firestore.collection('CityCategory').doc(this.catId).collection('All '+this.cat).doc(this.cid).collection("/review",ref=>ref.orderBy("TimeStamp","desc")).snapshotChanges().subscribe(data=>{
      this.review = data.map(e=>
        {
          return{
            id :e.payload.doc.id,
            Name:e.payload.doc.data()["Name"],
            Review: e.payload.doc.data()["Review"],
            Star:e.payload.doc.data()["Star"],
            emoji:e.payload.doc.data()["Emoji_Link"],
            Date :e.payload.doc.data()["Date"],
            timeStamp : e.payload.doc.data()["TimeStamp"],
          };       
          
          
        })

         var count = Object.keys(this.review).length;
        this.count = count;
       this.FiveCount = Object.keys(this.review.filter(item=>item.Star === 5 )).length;
       this.FourCount = Object.keys(this.review.filter(item=>item.Star === 4 )).length;
       this.ThreeCount = Object.keys(this.review.filter(item=>item.Star === 3 )).length;
       this.TwoCount = Object.keys(this.review.filter(item=>item.Star === 2 )).length;
       this.OneCount = Object.keys(this.review.filter(item=>item.Star === 1 )).length;
        this.five = this.FiveCount/count;
        this.four = this.FourCount/count;
        this.three = this.ThreeCount/count;
        this.two = this.TwoCount/count;
        this.one = this.OneCount/count;
        this.total = ((this.FiveCount*5 + this.FourCount*4 + this.ThreeCount*3+ this.TwoCount*2+ this.OneCount*1)/count).toString();
        if(this.total === "NaN") this.total = '0'
        // console.log('Total',this.total)
        // console.log('5',this.five)
        // console.log('4',this.four)
        // console.log('3',this.three)
        // console.log('2',this.two)
        // console.log('1',this.one)
        // var count = Object.keys(this.review).length;
        // var count = Object.keys(this.review).length;
        // var count = Object.keys(this.review).length;
        // var count = Object.keys(this.review).length;
     console.log(this.review);
     
    })
}

async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Options',
    cssClass: 'my-custom-class',
    buttons: [
     
     {
      text: 'Edit',
      icon: 'create',
      handler: () => {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "id" : this.CName,
            "nid":this.cid,
            "cateName" : this.catId,
            // "Description" : this.CName,
            "Address" : this.Address,
            "Category" : this.cat,
            "count" :  this.Mobile,
            "Mobile" : this.Mobile,
            "About" : this.About,
            "imageId" : this.imageId,
            "StartTime" : this.stime,
            "EndTime" :  this.etime,
            "off" :  this.off,
        }
      };
        console.log(navigationExtras);
        this.router.navigate(['/catlist/edit'], navigationExtras);
      }
      
    }, 
    {
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        if(this.device.uuid == this.uuid){
          this.delete()
        }
        else{
          this.error1();
        }
      }
    },
   ]
  });
  await actionSheet.present();

  const { role } = await actionSheet.onDidDismiss();
 
}

delete(){
  this.firestore.collection('CityCategory').doc(this.catId).collection('All '+ this.cat).doc(this.cid).delete().then(() => {
    this.presentLoadingSuccess()
   
}).catch((error) => {
    console.error("Error removing document: ", error);
});

}
async error1() {
  const toast = await this.toastController.create({
    message: 'You Can\'t delete',
    duration: 2000
  });
  toast.present();
}
async success() {
  
  const toast = await this.toastController.create({
    message: 'Deleted',
    duration: 2000
  });
  toast.present();

}
async presentLoadingSuccess() {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  console.log('Loading dismissed!');
  this.success()
  this._location.back();
}
}


