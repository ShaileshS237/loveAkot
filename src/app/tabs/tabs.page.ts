import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { CoronaService } from '../services/corona.service'
import Typewriter from 't-writer.js'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
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
export class TabsPage  {
  then: string;
  name: any;
  activeHomepage = false;
  activeInfo = false;
  activeNotification = false;
  activeProfile = false;
  img: string = '/assets/icon/logoLarge.png';
  language: any;
  // name = 'Angular';
  // then: any ;


 
  constructor(public storage:Storage,public corona:CoronaService,
    private menu: MenuController,private router: Router
    ) 
    { 
      this.corona.langauge.subscribe(res=>{
        this.language = res
        console.log('tab',this.language);
        
      })
      this.storage.get('lang').then((val)=>{
        this.language = val;
        console.log('val',val);
        
      })
        this.storage.get('name').then((val)=>{
          this.name = val;
        })
    } 
    ngOnInit(){
  
      // Local Storage
      this.storage.create();
     
      this.storage.get('showModal').then((val)=>{
        if(val == null || val == undefined) {
          this.then = 'show'
        } 
        else
        {
          this.then = 'notShow';
        }
      })
    }
 onClick(){
   
  this.storage.set('showModal',true); 
  this.then='notShow'
 
 }

//  changeIcon(id:any){
//   if (id == 'home') {
//     this.img ='/assets/icon/logoLarge.png'
//   } else {
//     this.img ='/assets/icon/logoBig.png'
//   }  

// }
}
