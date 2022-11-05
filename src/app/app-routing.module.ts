import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'aboutakot',
    loadChildren: () => import('./aboutakot/aboutakot.module').then( m => m.AboutakotPageModule)
  },
  {
    path: 'covid',
    loadChildren: () => import('./covid/covid.module').then( m => m.CovidPageModule)
  },
  {
    path: 'train',
    loadChildren: () => import('./train/train.module').then( m => m.TrainPageModule)
  },
  {
    path: 'add-news',
    loadChildren: () => import('./add-news/add-news.module').then( m => m.AddNewsPageModule)
  },
  {
    path: 'emergency',
    loadChildren: () => import('./emergency/emergency.module').then( m => m.EmergencyPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'doctor',
    loadChildren: () => import('./information/doctor/doctor.module').then( m => m.DoctorPageModule)
  },
  {
    path: 'newsdisc',
    loadChildren: () => import('./information/newsdisc/newsdisc.module').then( m => m.NewsdiscPageModule)
  },
  {
    path: 'newsdisc/:id ',
    loadChildren: () => import('./information/newsdisc/newsdisc.module').then( m => m.NewsdiscPageModule)
  },
  {
    path: 'restaurant',
    loadChildren: () => import('./information/restaurant/restaurant.module').then( m => m.RestaurantPageModule)
  },
  {
    path: 'blooddonation',
    loadChildren: () => import('./blooddonation/blooddonation.module').then( m => m.BlooddonationPageModule)
  },
  {
    path: 'bd',
    loadChildren: () => import('./bd/bd.module').then( m => m.BdPageModule)
  },
  {
    path: 'eventsadd',
    loadChildren: () => import('./information/eventsadd/eventsadd.module').then( m => m.EventsaddPageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'moneycon',
    loadChildren: () => import('./moneycon/moneycon.module').then( m => m.MoneyconPageModule)
  },
  {
    path: 'postadd',
    loadChildren: () => import('./information/postadd/postadd.module').then( m => m.PostaddPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./information/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'catlist',
    loadChildren: () => import('./catlist/catlist.module').then( m => m.CatlistPageModule)
  },
  {
    path: 'bank',
    loadChildren: () => import('./information/bank/bank.module').then( m => m.BankPageModule)
  },
  {
    path: 'infocon',
    loadChildren: () => import('./infocon/infocon.module').then( m => m.InfoconPageModule)
  },
  {
    path: 'restaurants',
    loadChildren: () => import('./information/restaurants/restaurants.module').then( m => m.RestaurantsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'clist',
    loadChildren: () => import('./clist/clist.module').then( m => m.ClistPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'postdetails',
    loadChildren: () => import('./postdetails/postdetails.module').then( m => m.PostdetailsPageModule)
  },
  {
    path: 'lang',
    loadChildren: () => import('./lang/lang.module').then( m => m.LangPageModule)
  },



  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
