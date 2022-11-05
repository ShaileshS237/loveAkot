import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  language: any;

  constructor(
    public alertController: AlertController,
    private router: Router,  private storage: Storage,
  ) {}

  ngOnInit() {
    this.storage.get('lang').then((val)=>{
      this.language = val
      console.log('container',val);
      
     })
  }

  async presentAlertPrompt(
    
  ) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Admin Login!',
      inputs: [
        
        {
          name: 'name8',
          type: 'password',
          
          placeholder: 'Password',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 10,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data  => {
           if(data.name8 == 'Shadip@143'){
            this.router.navigate(['/admin']);
           }
           
          }
        }
      ]
    });

    await alert.present();
  }

}
