import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { FIRESEBASE_CONFIG } from './firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore'
import * as firebase from 'firebase';
import { IonicStorageModule } from '@ionic/storage-angular';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Device } from '@ionic-native/device/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {Firebase} from '@ionic-native/firebase'
import { Platform } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { HideHeaderDirective } from './directives/hide-header.directive';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import {HideOnscrollModule} from 'ionic-hide-onscroll';
import { Clipboard } from '@ionic-native/clipboard/ngx';  
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { Downloader } from '@ionic-native/downloader/ngx';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import {NgxImageCompressService} from 'ngx-image-compress';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {TimeAgoPipe} from 'time-ago-pipe';
// import { AppRoutingModule } from './app-routing.module';
import { TimeagoModule } from 'ngx-timeago';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@NgModule({
  declarations: [AppComponent, HideHeaderDirective, DateAgoPipe],
  entryComponents: [],
  imports: [
    
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '_mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql'],
    }),
    RouterModule,
    AppRoutingModule, TimeagoModule.forRoot(),
    HttpClientModule,IonicHeaderParallaxModule,
    AngularFireModule.initializeApp(FIRESEBASE_CONFIG), 
    AngularFireAuthModule, IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,AngularFirestoreModule,BrowserAnimationsModule,
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy , },Camera, StatusBar,AppVersion,GoogleAnalytics,
    SMS,Clipboard,LocalNotifications,OneSignal,AndroidPermissions,Downloader,NgxImageCompressService,Deeplinks,
    SocialSharing,PhotoViewer,CallNumber,Device,UniqueDeviceID,Network,NetworkInterface
    , ],
  bootstrap: [AppComponent],
  
})
export class AppModule {

}
