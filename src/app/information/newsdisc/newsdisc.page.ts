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
import { trigger, transition, style, animate } from '@angular/animations';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-newsdisc',
  templateUrl: './newsdisc.page.html',
  styleUrls: ['./newsdisc.page.scss'],
  animations: [
    trigger('fade', [      
      // transition('void => *', [
      //   style({opacity: 0}),
      //   animate(500, style({opacity: 1}))
      // ]),
      transition('* => void', [
        animate(300, style({opacity: 0}))
      ])
    ]),
    trigger('fade2', [      
      transition('void => *', [
        style({opacity: 0}),
        animate(300, style({opacity: 1}))
      ]),
     
    ])

]
})
export class NewsdiscPage implements OnInit {
  public data: any;
  title: any;
  image: any;
  disc: any;
  public count:number;
  date: any;
  ContName: any;
  Review: any;
  public posts: any;
  db: string;
  loading :any = true;
  language: any;
  page: string;
  // pageCount:any = 0;
  constructor(
    public storage:Storage, public social:SocialSharing,
    private router: Router ,private route: ActivatedRoute,private firestore:AngularFirestore,) { 
    
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.data = params.id;
        // this.page = params.page
      }
    });
   
   
  }
  onLoad() {
    this.loading = false;
}

  ngOnInit() {
    // if(this.page == 'tab3')
    this.getNews();
    // else
    // this.addCount
    this.storage.get('lang').then(val=>{
      this.language = val;
      console.log(val);
    })
    
  }

  share(){
    
    var options = {
      message: this.title+'\n', // not supported on some apps (Facebook, Instagram)
      url: 'https://loveakot.in/newsdisc?id='+this.data,
    };console.log(options);
    this.social.shareWithOptions(options);
  }
  getNews(){
    this.firestore.collection('News').doc(this.data).valueChanges().subscribe(data=>{
      this.posts = data;
    console.log(typeof this.posts);
    
      this.title = this.posts.Title;
        this.image = this.posts.image_url;
        this.disc = this.posts.Description;
        this.date = this.posts.date;
        this.count = this.posts.count;
        // this.pageCount = this.count;
        // console.log('this',typeof this.count);
        // this.addCount(this.posts.count);
        this.ContName = this.posts.ContName;
      console.log("mydata",this.posts);
      
    }
    
    )
  
    
    
  }

  addCount(){
  // this.firestore.collection('News').doc(this.data).get(data=>)
   this.firestore.collection('News').doc(this.data).update({
     count : this.count++,
   })
   console.log('addcount',this.count);
  }


}
