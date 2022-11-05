import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {
  public langauge = new Subject<any>();
  constructor(private http:HttpClient) { }

  getDist():Observable<any>{
    const url = "https://api.covid19india.org/state_district_wise.json";
    return this.http.get<any>(url);
  }
  // getDist():Observable<any>{
  //   const url = "http://indianrailapi.com/api/v2/AllTrainOnStation/apikey/<apikey>/StationCode/<StationCode>/";
  //   return this.http.get<any>(url);
  // }
  setLang(lang:any){
    this.langauge.next(lang)
  }
}
