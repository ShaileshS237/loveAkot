import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-allevents',
  templateUrl: './allevents.page.html',
  styleUrls: ['./allevents.page.scss'],
})
export class AlleventsPage implements OnInit {
  eventData: string;
  words: string[];
  data: any;

  constructor(private route: ActivatedRoute,private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.data = JSON.parse(params.id);
        if(this.data.image == undefined){
          this.data.image = "/assets/eventsss.jpg"
        }
        // this.title = params.title;
        console.log('data',this.data);
        
      }
    });  
   }

  ngOnInit() {
  }
  navigate(allData:any) {
    // tslint:disable-next-line: align
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(allData)
      }
  };
    this.router.navigate(['/events'], navigationExtras);
  }
  
}
