import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notiData: any;

  constructor(private httpClient:HttpClient,) { }
  notificationData='https://onesignal.com/api/v1/notifications?app_id=cfa21f14-23d0-4be7-b1e5-58fcbb724be3&limit=50&offset=0'
  ngOnInit() {
    this.getInfo()
  }
  getInfo() {
    const headers = { 'Content-Type' : 'application/json', 'Authorization': 'Basic MTBiNWJjODctZmJhMC00NGQzLTgxOGUtMWFjZTc5OGEzNGVk' };
    this.httpClient.get(this.notificationData,{ headers }).subscribe((vacineData=>{
      this.notiData = <any> vacineData;
      console.log('covid',this.notiData);
    }))
     
    }
}
