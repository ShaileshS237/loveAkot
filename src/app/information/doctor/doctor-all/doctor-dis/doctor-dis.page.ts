import { Component, OnInit } from '@angular/core';
import { doctors } from 'src/app/shared/json/doctors';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FIRESEBASE_CONFIG,snapshotToArray } from '../../../../firebase';
import { NavController, LoadingController, ToastController, MenuController, AlertController } from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore'
import { getUrlScheme } from '@angular/compiler';
import { animate, style, transition, trigger } from '@angular/animations';
import { CallNumber } from '@ionic-native/call-number/ngx';
// import { DateAgoPipe } from 'src/app/pipes/date-ago.pipe';
// import {TimeAgoPipe} from 'time-ago-pipe';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-doctor-dis',
  templateUrl: './doctor-dis.page.html',
  styleUrls: ['./doctor-dis.page.scss'],
  animations: [
    trigger('fade', [      
      transition('void => *', [
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(300, style({opacity: 0}, ))
      ])
    ])

]
})
export class DoctorDisPage implements OnInit {
  data: any;
  id: any;
  star: any;
  emoji: any;
  yesReview: boolean;
  Name: any;
  Review: any;
  date: any;
  timeStamp: any;
  review: { id: string; Name: any; Review: any; Star: any; emoji: any; Date: any; timeStamp: any; }[];
  count: number;
  FiveCount: number;
  FourCount: number;
  ThreeCount: number;
  TwoCount: number;
  OneCount: number;
  five: number;
  four: number;
  three: number;
  two: number;
  one: number;
  total: string;
  error2: boolean;
  clicked: number;
  todayData: Date;

  constructor(public storage:Storage,
    private loadingController:LoadingController,private callNumber: CallNumber,public alertController: AlertController,
    private menu: MenuController,public toastController: ToastController,private router: Router ,private route: ActivatedRoute,private firestore:AngularFirestore) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.data = JSON.parse(params.id);
        // this.title = params.title;
        console.log('data',this.data);
        
      }
    });
    this.todayData = new Date()
    this.storage.get('name').then((val)=>{
      this.Name = val
    
      
    })
  }

  ngOnInit() {
    this.getReviews();
    this.date = new Date().toString();
    this.timeStamp = new Date();
  }
  addClass(id: any,src:any) {
    this.id = id;
    this.star = id;
    this.emoji = src;
   this.yesReview = true;
   console.log(this.star);
   console.log(this.emoji )
   
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
  toast.present();
}
// async createReview2(){
//   if(this.Review==undefined || this.Review == '') this.error2=true
//   else {
//     this.clicked = 1;
//     let Records = {};
//     if(this.Name === undefined || this.Name=='')
//      Records['Name'] = 'Anonymous';
//     else Records['Name'] = this.Name;
//     Records['Review'] = this.Review;
//     Records['Emoji_Link'] = this.emoji;
//     Records['Star'] = this.star;
//     Records['Date'] = this.date;
//     Records['TimeStamp'] = this.timeStamp;
//     console.log(Records);
    
//      try {
//       await this.firestore.collection('CityCategory').doc(this.catId).collection('All '+this.cat).ref.doc(this.cid).collection("/review").add(Records);
//       this.presentLoading();
//      } catch (error) {
//       console.log('error',error) 
//      }
//     }
//  }
// /doctors/KyQAtjQrgAsXpEVzOCzj/rating;
async createReview(){
  if(this.Review==undefined || this.Review == '') this.error2=true
  else {
    this.clicked = 1;
    let Records = {};
    if(this.Name === undefined)Records['Name'] = 'Anonymous';
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
      console.log(error) 
     }
    }
 }
  cat(cat: any) {
    throw new Error('Method not implemented.');
  }
  cid(cid: any) {
    throw new Error('Method not implemented.');
  }
  
 async presentLoading(Records:any) {

  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Adding Review, Please Wait...',
    duration: 3000
  });
 
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  console.log('Loading dismissed!');
  await this.firestore.collection('Doctors').ref.doc(this.data.id).collection("/review").add(Records);
  this.clicked = 0;
  this.id = 0;
  this.Name=this.Name;
  this.Review=""
  this.yesReview =false;
  this.presentToast();
  
}
getReviews(){
    
  this.firestore.collection('Doctors').doc(this.data.id).collection("/review",ref=>ref.orderBy("TimeStamp","desc")).snapshotChanges().subscribe(data=>{
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
        // // var count = Object.keys(this.review).length;
        // // var count = Object.keys(this.review).length;
        // // var count = Object.keys(this.review).length;
        // // var count = Object.keys(this.review).length;
     console.log(this.review);
     
    })
}
call(){
  
this.callNumber.callNumber(this.data.MobNo, true)
.then(res => console.log('Launched dialer!', res))
.catch(err => console.log('Error launching dialer', err));
}

async presentAlertConfirm() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
   
    message: 'Do you really want to call?',
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
          this.call()
        }
      }
    ]
  });

  await alert.present();
}
}
