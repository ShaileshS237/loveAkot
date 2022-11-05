import { Component, OnInit } from '@angular/core';
import { emeNos } from './emergencynos';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.page.html',
  styleUrls: ['./emergency.page.scss'],
})
export class EmergencyPage implements OnInit {
  noLists: any [] = [];
  lang: any;
  constructor(private callNumber: CallNumber,public alertController: AlertController,
    public storage:Storage,
    ) { 
    this.noLists = emeNos;
    console.log(this.noLists);
    this.storage.get('lang').then(val=>{
      this.lang = val
    })
  }

  ngOnInit() {
 
  }
call(number:any){
  this.callNumber.callNumber(number, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
}

async presentAlertConfirm(numb:any) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
   
    message: 'Do you really want to call?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Yes',
        handler: () => {
          this.call(numb)
        }
      }
    ]
  });

  await alert.present();
}
}
