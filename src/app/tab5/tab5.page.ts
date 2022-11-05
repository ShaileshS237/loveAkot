import {
  Component,
  HostListener,
  OnInit
} from '@angular/core';
import {
  NavController,
  LoadingController,
  ToastController,
  MenuController,
  AlertController
} from '@ionic/angular';
import Typewriter from 't-writer.js'
import {
  FIRESEBASE_CONFIG,
  snapshotToArray
} from '../firebase';
import {
  Router,
  ActivatedRoute,
  NavigationExtras,
  RoutesRecognized
} from '@angular/router';
import {
  AngularFirestore
} from '@angular/fire/firestore'
import {
  Device
} from '@ionic-native/device/ngx';
import {
  PhotoViewer
} from '@ionic-native/photo-viewer/ngx';
import {
  Storage
} from '@ionic/storage-angular';
import {
  filter,
  pairwise
} from 'rxjs/operators';
import {
  ActionSheetController
} from '@ionic/angular';
import {
  Clipboard
} from '@ionic-native/clipboard/ngx';
import {
  SocialSharing
} from '@ionic-native/social-sharing/ngx';
import {
  AndroidPermissions
} from '@ionic-native/android-permissions/ngx';
import {
  DateAgoPipe
} from '../pipes/date-ago.pipe';
import {
  interval,
  Subscription
} from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  animations: [
    trigger('fade', [      
    
      transition('* => void', [
        animate(10000, style({opacity: 0}))
      ])
    ])
  ]
})
export class Tab5Page implements OnInit {
  load: boolean = true;
  posts: any;
  category: any;
  posts2: any;
  name: Promise < any > ;
  cache: any;
  previousUrl: string;
  showError: boolean;
  scrolled = 0;
  @HostListener('window:scroll', ['$event'])
  private updateSubscription: Subscription;
  stopLoading: boolean;
  uuid: string;
  language: any;
  liked: any = 'false';
  show = false;
  likes:any;
  onWindowScroll($event) {
    console.log($event);

    const numb = window.scrollY;
    if (numb >= 50) {
      this.scrolled = 1;
    } else {
      this.scrolled = 0;
    }
  }
  constructor(private socialSharing: SocialSharing,
    private androidPermissions: AndroidPermissions,
    public toastController: ToastController,public alertController: AlertController,
    private loadingController: LoadingController,private af: AngularFireStorage,
    private storage: Storage, public actionSheetController: ActionSheetController, private clipboard: Clipboard,
    private device: Device, private firestore: AngularFirestore, private menu: MenuController, private router: Router,
    private photoViewer: PhotoViewer) {
    
    this.storage.get('lang').then(val=>{
      this.language = val;
    })
      
      this.uuid = this.device.uuid;
    this.updateSubscription = interval(1000).subscribe(
      (val) => {
        if (navigator.onLine) {
          this.showError = false;
        } else {
          this.showError = true;
        }
      }

    );
    // if(navigator.onLine){
    //   this.showError = false;
    //  }

    this.router.events
      .pipe(filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      ).subscribe((e: any) => {
        if (e[0].urlAfterRedirects === '/postadd') {


        } // previous url
      });
    console.log('Device UUID is: ' + this.device.uuid);
    this.getPosts();


  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  viewImage(image: any) {
    this.photoViewer.show(image);
  }
  loading: boolean = true
  onLoad() {
    this.loading = false;
  }
  ngOnInit() {

    this.storage.get('lang').then((val)=>{
      this.language = val
      if (this.language == 'English') {
        const target = document.querySelector('.tw2');
        const writer = new Typewriter(target, {
          loop: true,
          typeSpeed: 40,
          deleteSpeed: 60,
          typeColor: '#00f3ff'
        })
    
        writer
          .rest(500)
          .type('Important Updates.')
          .rest(500)
          .clear()
          .type('Images.')
          .rest(500)
          .clear()
          .type('Emergency Information.')
          .rest(500)
          .clear()
          .type('Your Thoughts.')
          .rest(500)
          .clear()
          .type('Your Opinion.')
          .rest(500)
          .clear()
          .changeOps({
            typeSpeed: 40
          })
          .type('Or Anything.')
          .rest(1000)
          .clear()
          .start()
       } else {
        const target = document.querySelector('.tw2');
        const writer = new Typewriter(target, {
          loop: true,
          typeSpeed: 40,
          deleteSpeed: 60,
          typeColor: '#00f3ff'
        })
    
        writer
          .rest(500)
          .type('महत्वाचे उपडेट')
          .rest(500)
          .clear()
          .type('फोटो.')
          .rest(500)
          .clear()
          .type('आपत्कालीन माहिती.')
          .rest(500)
          .clear()
          .type('तुमचे विचार.')
          .rest(500)
          .clear()
          .type('तुमचे मत.')
          .rest(500)
          .clear()
          .changeOps({
            typeSpeed: 40
          })
          .type('किंवा काहीही.')
          .rest(1000)
          .clear()
          .start()
       }
      console.log('tab5',val);
      
     })

     
    
  }
  // ref=>ref.orderBy("date","asc")

  // like(id:any,likes:any){
  //   let Records = {};
  //   Records['userId'] = this.uuid;
    
  //   this.firestore.collection('Posts').doc(id).collection('likedPeople').doc('id').set(Records);
  //   this.firestore.collection('Posts').doc(id).update({
  //     likes : likes++
  //   })
    
  //   }
  //   unlike(id:any,likes:any){
  //     this.firestore.collection('Posts').doc(id).update({
  //       likes : likes--
  //     })
  //     this.liked = 'false';
  //   }

  
  getPosts() {
   try {
    this.firestore.collection('Posts', ref => ref.orderBy("timeStamp", "desc")).snapshotChanges().subscribe(data => {
      
      this.posts = data.map(e => {
        return {
          id: e.payload.doc.id,
          Message: e.payload.doc.data()["Message"],
          Name: e.payload.doc.data()["Name"],
          date: e.payload.doc.data()["date"],
          image: e.payload.doc.data()["image"],
          timestamp: e.payload.doc.data()["image"],
          uuid: e.payload.doc.data()["uuid"],
          fileName: e.payload.doc.data()["fileName"],
          likes : e.payload.doc.data()["likes"],
        };
        
      })
      this.posts.forEach(element => {
        if(element.Message.length>300){
          element.show = true;
        }
      });


      // this.posts.forEach(element => {
      //   this.firestore.collection('Posts').doc(element.id).collection('likedPeople').snapshotChanges().subscribe(like=>{
      //     this.likes = like.map(e=>{
      //       return{
      //         id:e.payload.doc.id,
      //         userId:e.payload.doc.data()['userId']
      //       }
      //       // console.log(this.likes);
            
      //     })
      //     this.likes.forEach(element2 => {
      //       if(this.uuid == element2.userId){
      //         element.liked = true
      //       }
      //       else{
      //         element.liked =false
      //       }
      //     });
         
         
      //   })
        
      // });
      // this.posts.forEach(element => {
      //   this.posts.
      // });
      if(this.posts){
        this.stopLoading = true;
      }
      console.log(this.posts);
    })
   } catch (error) {
     this.error()
   }

    
  }
  async error() {
    const toast = await this.toastController.create({
      message: 'Something went wrong',
      duration: 2000
    });
    toast.present();
  }


  async presentActionSheet(image: any, post: any, id: any, uuid:any,fileName:any) {
   if (this.language =='English') {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [{
          text: 'Report..',
          role: 'destructive',
          icon: 'alert-outline',
          handler: () => {
            this.report(id);
          }
        },
        // {
        //   text: 'Copy Link',
        //   icon: 'copy-outline',
        //   handler: () => {
        //     console.log('Share clicked');
        //   }
        // },
        {
          text: 'Share to..',
          icon: 'share-social-outline',
          handler: () => {
            this.share(uuid,image, post);
          }
        },
        {
          text: 'Delete',
          icon: 'trash-outline',
          handler: () => {
            this.delete(id, uuid,image,fileName);
          }
        },
      ]
    });
    await actionSheet.present();
   } else {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [{
          text: 'रिपोर्ट करा..',
          role: 'destructive',
          icon: 'alert-outline',
          handler: () => {
            this.report(id);
          }
        },
        // {
        //   text: 'Copy Link',
        //   icon: 'copy-outline',
        //   handler: () => {
        //     console.log('Share clicked');
        //   }
        // },
        {
          text: 'शेअर करा',
          icon: 'share-social-outline',
          handler: () => {
            this.share(uuid,image, post);
          }
        },
        {
          text: 'हटवा',
          icon: 'trash-outline',
          handler: () => {
            this.delete(id, uuid,image,fileName);
          }
        },
      ]
    });
    await actionSheet.present();
   }
  }
delete(id:any, uuid:any,img:any,fileName:any){ 
  if(this.uuid == uuid){
    this.presentAlertConfirm(id,img,fileName)
  }
  else{
    this.errorToast();
  }
}
async presentAlertConfirm(id:any,img:any,fileName:any) {
  if (this.language =='English') {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete!',
      message: 'Are you sure you want to delete?',
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
           this.presentLoading2(id,img,fileName)
          }
        }
      ]
    });
  
    await alert.present();
  } else {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'हटवा!',
      message: 'तुम्हाला खरच हटवायचे आहे का?',
      buttons: [
        {
          text: 'नाही',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'होय',
          handler: () => {
           this.presentLoading2(id,img,fileName)
          }
        }
      ]
    });
  
    await alert.present();
  }
}

// deletePost(){
//   this.presentLoading2();
  
// }
async done() {
  if (this.language =='English') {
    const toast = await this.toastController.create({
      message: 'Deleted.',
      duration: 2000
    });
    toast.present();
  } else {
    const toast = await this.toastController.create({
      message: 'हटवले.',
      duration: 2000
    });
    toast.present();
  }
}
async presentLoading2(id:any,img:any,fileName:any) {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  console.log('Loading dismissed!');
  this.af.storage.ref().child('Postimage/Post'+fileName).delete().then(() => {
    console.log('Deleted');
    
  }).catch((error) => {
    console.log('Not Deleted');
  });
  ;
  this.firestore.collection("Posts").doc(id).delete().then(()=>{
    console.log('Deleted');
    this.done()
})
}



async errorToast() {
  if (this.language =='English'){
  const toast = await this.toastController.create({
    message: 'Sorry, You cant\'t delete this post',
    duration: 2000
  });
  toast.present();
}
else{
  const toast = await this.toastController.create({
    message: 'माफ करा, तुम्ही हि पोस्ट हटवु शकत नाही',
    duration: 2000
  });
  toast.present();
}
}
  async report(id: any) {
    if (this.language =='English') {
      const actionSheet = await this.actionSheetController.create({
        header: 'Why are you reporting this post?',
        cssClass: 'my-custom-class',
        animated: true,
  
        buttons: [{
            text: 'Hate Speech or symbols',
            role: 'destructive',
            handler: () => {
                this.addFeedback(id,'Hate Speech or symbols')
            }
          },
          {
            text: 'Violence or dangerous',
            role: 'destructive',
            handler: () => {
              this.addFeedback(id,'Violence or dangerous')
            }
          },
  
          {
            text: 'False information',
            role: 'destructive',
            handler: () => {
              this.addFeedback(id,'Violence or dangerous')
            }
          },
          {
            text: 'Don\'t like it',
            role: 'destructive',
            handler: () => {
              this.addFeedback(id,'Violence or dangerous')
            }
          },
        ]
      });
      await actionSheet.present();
    } else {
      const actionSheet = await this.actionSheetController.create({
        header: 'आपण या पोस्टला रेपोर्ट का करत आहात?',
        cssClass: 'my-custom-class',
        animated: true,
  
        buttons: [{
            text: 'द्वेषयुक्त भाषण किंवा चिन्हे',
            role: 'destructive',
            handler: () => {
                this.addFeedback(id,'Hate Speech or symbols')
            }
          },
          {
            text: 'हिंसा किंवा धोकादायक',
            role: 'destructive',
            handler: () => {
              this.addFeedback(id,'Violence or dangerous')
            }
          },
  
          {
            text: 'चुकीची माहिती',
            role: 'destructive',
            handler: () => {
              this.addFeedback(id,'Violence or dangerous')
            }
          },
          {
            text: 'मला आवडले नाही',
            role: 'destructive',
            handler: () => {
              this.addFeedback(id,'Violence or dangerous')
            }
          },
        ]
      });
      await actionSheet.present();
    }
  }

  share(id:any,image: any, post: any) {
    var options = {
      url: 'https://loveakot.in/postdetails?id='+id,
    };
    this.socialSharing.shareWithOptions(options);
  }

  async presentToast() {
    if (this.language == 'English') {
      const toast = await this.toastController.create({
        message: 'Thankyou for your feedback.',
        duration: 1500
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'आपल्या अभिप्रायाबद्दल धन्यवाद.',
        duration: 1500
      });
      toast.present();
    }
  }

  async addFeedback(id: any, message: any) {
    let Records = {};
    Records['message'] = message;
    try {
      await this.firestore.collection('Posts').doc(id).collection('feedback').add(Records);
      this.presentLoading();
    } catch (error) {
      console.log(error)
    }
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Adding feedback, Please Wait...',
      duration: 1000,
    });
    await loading.present();
   
    console.log('Loading dismissed!');
   this.ionViewDidLoad();
    // this.location.back(); 
  }
  ionViewDidLoad(){
    setTimeout(() => {
      this.presentToast();
    }, 1500);
}





redirectComment(id:any){
  let navigationExtras: NavigationExtras = {
    queryParams: {
      'id': id,
      // 'id2': id,
  }
};
this.router.navigate(['/postdetails'], navigationExtras);
}


}
