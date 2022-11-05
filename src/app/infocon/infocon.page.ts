import { Component, OnInit } from '@angular/core';
import { city_category } from '../json_files/category';
import { NavigationExtras, Router } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore'
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-infocon',
  templateUrl: './infocon.page.html',
  styleUrls: ['./infocon.page.scss'],
})
export class InfoconPage implements OnInit {
  cityData:any;
  category: { id: string; img: any; title: any; }[];
  language: any;
  constructor(public loadingController: LoadingController,
    public storage:Storage,
    private router:Router,private firestore:AngularFirestore,public alertController: AlertController) { }

  ngOnInit() {
    this.storage.get('lang').then((val)=>{
      this.language = val
    
      
     })
    this.cityData = city_category.filter(item=>item.title !== 'Doctors' && item.title !=='Movie Theater' && item.title !=='Banks' );
   this. getCategory();
  }
   navigate(id: string, title: string,titleM:any) {
        // tslint:disable-next-line: align
        let navigationExtras: NavigationExtras = {
          queryParams: {
            'id': id,
            'Title':title,
        }
      };
        this.router.navigate(['/infocon/infocondetail'], navigationExtras);
      }

      getCategory(){
 
        this.firestore.collection('CityCategory',ref=>ref.orderBy("title","asc")).snapshotChanges().subscribe(data=>{
          this.category = data.map(e=>
            {
              return{
                id :e.payload.doc.id, 
                img: e.payload.doc.data()["img"],
                title:e.payload.doc.data()["title"],
                titleM:e.payload.doc.data()["titleM"]
              };        
            }).filter(x =>(x.title !='Banks') && (x.title !='Doctors'));
           console.log(this.category);
           
            
           
        })
        }

        async presentAlertPrompt() {
         if (this.language == 'English') {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Request Category!',
            message :'Please request category, which is not available in following list.',
            inputs: [
              {
                name: 'Name',
                type: 'text',
                placeholder: 'Your Name'
              },
              {
                name: 'catName',
                type: 'text',
                placeholder: 'Category Name'
              },
              {
                name: 'Mobile',
                type: 'text',
                placeholder: 'Mobile No'
              },
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
                  let Records = {};
                  Records['cont_Name'] = data.Name;
                  Records['categoryName'] = data.catName;
                  Records['Mobile No'] = data.Mobile;
                  this.firestore.collection("CityCategoryRequest").doc(data.catName).set(Records);
                  this.presentLoading();
                }
              }
            ]
          });
      
          await alert.present();
         } else {
          const alert = await this.alertController.create({
            cssClass: 'marathi',
            header: 'कॅटेगरीसाठी विनंती करा!',
            message :'कृपया लक्षात घ्या, इथे फक्त कॅटेगरीसाठी विनंती करा',
            inputs: [
              {
                name: 'Name',
                type: 'text',
                placeholder: 'तुमचे नाव'
              },
              {
                name: 'catName',
                type: 'text',
                placeholder: 'कॅटेगरीचे नाव'
              },
              {
                name: 'Mobile',
                type: 'text',
                placeholder: 'मोबाईल क्रमांक.'
              },
            ],
            buttons: [
              {
                text: 'रद्द करा',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  console.log('रद्द करा');
                }
              }, {
                text: 'ठीक आहे',
                handler: data  => {
                  let Records = {};
                  Records['cont_Name'] = data.Name;
                  Records['categoryName'] = data.catName;
                  Records['Mobile No'] = data.Mobile;
                  this.firestore.collection("CityCategoryRequest").doc(data.catName).set(Records);
                  this.presentLoadingM();
                }
              }
            ]
          });
      
          await alert.present();
         }
        }
        async presentLoading() {
          const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
            duration: 2000
          });
          await loading.present();
      
          const { role, data } = await loading.onDidDismiss();
          console.log('Loading dismissed!');
        }
        async presentLoadingM() {
          const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'कृपया, वाट पहा.',
            duration: 2000
          });
          await loading.present();
      
          const { role, data } = await loading.onDidDismiss();
          console.log('Loading dismissed!');
        }
}
