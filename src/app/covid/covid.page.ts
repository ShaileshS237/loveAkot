import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { city_category2 } from '../json_files/category copy';
@Component({
  selector: 'app-covid',
  templateUrl: './covid.page.html',
  styleUrls: ['./covid.page.scss'],
})
export class CovidPage implements OnInit {
  covidVac: any;
  covidVacD: any;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    zoom: false,
    slidesPerView: 1,
    spaceBetween : 5,
    autoplay: {
      delay: 3000,
    },
    pagination: true,
  };
  slideOpts3 = {
   
    speed: 400,
    zoom: false,
    slidesPerView: 2,
    spaceBetween : 5,
   
    pagination: true,
  };
  lanugage: any;
  showNothing: boolean;
  constructor(private httpClient:HttpClient,public storage:Storage) {
    this.storage.get('lang').then(val=>{
      this.lanugage = val
      console.log(val);
      
    })

    var d = new Date();
    var url2= "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=444101&date="+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
    this.httpClient.get(url2).subscribe((data)=>{
      this.covidVac = data; 
      console.log(this.covidVac.centers.length);
      if (this.covidVac.centers.length === 0) {
        this.showNothing = true
       
        
      }
      this.covidVacD = this.covidVac.centers
      console.log('this',this.covidVacD);
      
    })
   }

  ngOnInit() {
  }

}
