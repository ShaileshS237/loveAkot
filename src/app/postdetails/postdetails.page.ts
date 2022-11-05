import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-postdetails',
  templateUrl: './postdetails.page.html',
  styleUrls: ['./postdetails.page.scss'],
})
export class PostdetailsPage implements OnInit {
  id: any;
  posts: any;
  title: any;
  Message: any;
  Name: any;
  timeStamp: any;
  image: any;
  comment: any;
  lang: any;
  constructor(
    public storage:Storage,
    private router: Router ,private route: ActivatedRoute,private firestore:AngularFirestore,) {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id = params.id;
      }
    });
   
   }

  ngOnInit() {
    this.getData();
    this.storage.get('name').then(val=>{
      this.comment = val
    })
    this.storage.get('lang').then(val=>{
      this.lang = val
    })
  }
  
  getData(){
    
    this.firestore.collection('Posts').doc(this.id).valueChanges().subscribe(data=>{
      console.log(data);
      this.posts = data;
      this.Message = this.posts.Message
      this.Name = this.posts.Name
      this.timeStamp = this.posts.timeStamp
      this.image = this.posts.image
    })
  }
}
