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
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
  public docTypes : any[] = [];
  constructor(private firestore:AngularFirestore,private menu: MenuController,private router: Router ) { }

  posts: any;
  ngOnInit() {
    this.docTypes = doctors;
    

  }
  navigate(id: string, title: string,img:string) {
    // tslint:disable-next-line: align
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id" : id,
        "title" : title,
        'bannerImage' : img

    }
  };
    this.router.navigate(['/doctor/doctor-all'], navigationExtras);
  }
 
  }

