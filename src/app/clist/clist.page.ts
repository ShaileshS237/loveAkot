import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
@Component({
  selector: 'app-clist',
  templateUrl: './clist.page.html',
  styleUrls: ['./clist.page.scss'],
})
export class ClistPage implements OnInit {
  title: any;
  img: any;

  constructor( private firestore:AngularFirestore) { }

  ngOnInit() {
  }
  async createNews(){
      let Records = {};
      Records['title'] = this.title;
      Records['img'] = this.img;
      Records['active'] = 'true';
      console.log(Records);
      
       try {
        await this.firestore.collection("CityCategory").doc(this.title.toUpperCase()).set(Records);
        console.log('ok');
        
        } catch (error) {
        console.log(error) 
       }
   }
}
