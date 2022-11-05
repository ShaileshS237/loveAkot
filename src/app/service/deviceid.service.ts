import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DeviceidService {
  name: any;

  constructor(
    private device: Device,
    private storage: Storage,
  ) {

   }

   getDevice(){
    console.log(this.device.uuid);
    
   }
   getName(){
     this.storage.get('name').then((val)=>{
      return val
      
     })
   }
}
