import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import Typewriter from 't-writer.js'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
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
export class WelcomePage implements OnInit {
  then: any;
  data: any;
  name: any;

  constructor(public storage:Storage,
    private menu: MenuController,private router: Router,private route: ActivatedRoute,) {
      this.route.queryParams.subscribe(params => {
        if (params && params.id) {
          this.data = params.id,
          this.name = params.Name
          console.log(this.name);
          
          // this.title = params.title;
          console.log('data',this.name);
        }
      });  
     }

  ngOnInit() {
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
    this.router.navigate(['/tabs']);
   }
}
