import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage'
import {AngularFirestore} from '@angular/fire/firestore'
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-adddoctors',
  templateUrl: './adddoctors.page.html',
  styleUrls: ['./adddoctors.page.scss'],
})
export class AdddoctorsPage implements OnInit {
  name: any;
  degree: any;
  fees: any;
  exp: any;
  mTime1: any;
  mTime2: any;
  eTime1: any;
  eTime2: any;
  off: any;
  MobNo: any;
  address: any;
  date: any;
  sex: any;
  category: any;

  constructor( private firestore:AngularFirestore,private af:AngularFireStorage,  private menu: MenuController,private router: Router ,private route: ActivatedRoute,) {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
      
        this.category = params.id

      }
    });
   }

  ngOnInit() {
    this.date = new Date();
  }
  async createNews(){

    
      let Records = {};
      Records['name'] = this.name;
      Records['degree'] = this.degree;
      Records['fees'] = this.fees;
      Records['exp'] = this.exp;
      Records['mTime1'] = this.mTime1;
      Records['mTime2'] = this.mTime2;
      Records['eTime1'] = this.eTime1;
      Records['eTime2'] = this.eTime2;
      Records['off'] = this.off;
      Records['MobNo'] = this.MobNo;
      Records['address'] = this.address;
      Records['date'] = this.date;
      Records['sex'] = this.sex;
      Records['category'] = this.category;
      console.log(Records);
      
       try {
        await this.firestore.collection("Doctors").add(Records);
        this.presentLoading();
       } catch (error) {
        console.log(error) 
       }
    }
  presentLoading() {
    throw new Error('Method not implemented.');
  }
}
