import { cardDetailsMenu } from './../shared/json/cardmenu';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, MenuController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { city_category } from '../json_files/category';
import { city_category2 } from '../json_files/category copy';
import { Title } from '@angular/platform-browser';
import {AngularFirestore} from '@angular/fire/firestore'
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  @ViewChild('search',{static:false}) search :IonSearchbar;
  contentLoads = false;
  language: any;
  public cards: any[] = [];
  public jsonData: any[] = [];
  public cityData: any[] = [];
  public cityData2: any[] = [];
  category:any;
  sliderOpts = {
    zoom: false,
    slidesPerView: 1,
    spaceBetween : 10,
    loop: true,
    autoplay:true,
    speed: 1000,
  };  
  feaCategory: { id: string; title: string; img: string; Link: string; }[];
  searchedItem: any;
  stopLoading: boolean;
  constructor(private menu: MenuController,private router: Router,private firestore:AngularFirestore,
    public storage:Storage
    ) {
    this.storage.get('lang').then((val)=>{
      this.language = val
      console.log('tab2',val);
     })
    setTimeout(() => {
     
    });
  this.cityData = city_category;
  this.cityData2 = city_category2;
    this.initJSONData();
    setTimeout(()=>{
      this.contentLoads = true;
    },3000)
   }
   loading: boolean = true
   onLoad() {
    this.loading = false;
  }
  //  _ionChange(event){
     
  //       if(event.detail.value == ""){
  //         this.category = this.category
  //       }
  //       else{
  //       const val =event.target.value;
  //       if(val && val.trim()!='')
  //       {
  //         this.category = this.category.filter((item:any)=>{
  //           return (item.title.toLowerCase().indexOf(val.toLowerCase())>-1);
  //         })
  //       }
  //     }
  //  }

   initJSONData(){
     this.jsonData = this.category;
   }

  menuList: any [] = [];
    ngOnInit(): void {
      this.getCategory();
        this.cards = cardDetailsMenu;
        this.menuList = cardDetailsMenu.filter(x => x.title !='');

      }
      i
      navigate(id: string, title: string,titleM:string,link:string) {
        // tslint:disable-next-line: align
        if(title === 'Doctors'){
          let navigationExtras: NavigationExtras = {
            queryParams: {
              'id': id,
              'Title':title,
              'TitleM':titleM,
          }
        };
          this.router.navigate(['/doctor'], navigationExtras);
        
        }
        else{
        let navigationExtras: NavigationExtras = {
          queryParams: {
            'id': id,
            'Title':title,
            'TitleM':titleM,
        }
      };
        this.router.navigate(['/catlist'], navigationExtras);
      }
    }



getCategory(){
this.firestore.collection('CityCategory',ref=>ref.orderBy("title","asc")).snapshotChanges().subscribe(data=>{
  this.category = data.map(e=>
    {
      return{
        id :e.payload.doc.id, 
        img: e.payload.doc.data()["img"],
        title:e.payload.doc.data()["title"],
        titleM:e.payload.doc.data()["titleM"],
        active:e.payload.doc.data()["active"]
      };        
    }).filter(x =>(x.active =='true'));
    if(Object.keys(this.category).length){
      this.stopLoading = true;
    }
   console.log(this.category);
})
}



  
  
}