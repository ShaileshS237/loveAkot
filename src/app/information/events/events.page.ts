import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  data: any;

  constructor(private route: ActivatedRoute, private photoViewer: PhotoViewer ,private callNumber: CallNumber) {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.data = JSON.parse(params.id);
        // this.title = params.title;
        console.log('data',this.data);
      }
    });  
   }

  ngOnInit() {
  }
  call(){
    this.callNumber.callNumber(this.data.contName, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }
  viewImage(image:any){
    this.photoViewer.show(image);
  }
}
