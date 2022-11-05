import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { NavigationExtras, Router } from '@angular/router';
import { Downloader,DownloadRequest,NotificationVisibility } from '@ionic-native/downloader/ngx';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  imageInfo: any;
  url: string;
  title: any;
  language: any;

  constructor(
    public toastController: ToastController,public storage:Storage,
    private router:Router, private firestore:AngularFirestore,private downloader: Downloader) { 

      this.storage.get('lang').then((val)=>{
        this.language = val
        
       })

    }

   

  download(url:any){
    if(url == 1){
      this.title='EnglishGuide';
      this.url="https://firebasestorage.googleapis.com/v0/b/loveakot-11975.appspot.com/o/english.pdf?alt=media&token=71390a71-6032-44dd-ba8b-64af9a512f3e"
    }
    else{
      this.title='MarathiGuide';
      this.url = "https://firebasestorage.googleapis.com/v0/b/loveakot-11975.appspot.com/o/marathi.pdf?alt=media&token=9a7bb8f9-18ef-4556-8889-cb863be34134"
    }
    var request: DownloadRequest = {
      uri: this.url,
      title:  this.title,
      description: 'How to use LoveAkot App',
      mimeType: 'application/pdf',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
          dirType: 'Downloads',
          subPath: 'LoveAkotGuide.pdf'
      }
  };
  
  this.downloader.download(request)
          .then(
            (location: string) => 
            
            console.log('File downloaded at:'+location)
           )
          .catch((error: any) => console.error(error));
  }


  
  ngOnInit() {
    this.getImageInfo();
  }
route(id){
  let navigationExtras :NavigationExtras ={
    queryParams:{
      "id": id,
    }
  };
  this.router.navigate(['/feedback'], navigationExtras);
}
getImageInfo(){
  try {
    this.firestore.collection('images').snapshotChanges().subscribe(data=>{
     this.imageInfo = data.map(e=>{
      return{
        active: e.payload.doc.data()["active"],
      }
     })
     this.imageInfo = this.imageInfo[0].active
     
    })
  } catch (error) {
    
  }
}
async presentToast() {
  const toast = await this.toastController.create({
    message: 'File Downloaded.',
    duration: 2000
  });
  toast.present();
}
}
