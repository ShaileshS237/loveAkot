import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from '@ionic/angular';
 
@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    public afs: AngularFirestore,
    private platform:Platform
  ) { }


  async getToken(){
    let token;
      // token = await this.firbaseNative.getToken();
      return this.saveToken(token);  
  }
  saveToken(token){
        if(!token) {
          console.log('Not Applicable');
          return
        }
        const deviceRef =this.afs.collection('devices')
        const docData = {
          token,
          userId : 'testUser',
        }
        return deviceRef.doc(token).set(docData)
   }
   listenToNotification(){
    //  return this.firbaseNative.onNotificationOpen()
   }
}
