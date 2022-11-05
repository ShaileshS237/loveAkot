  import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-categorynews',
  templateUrl: './categorynews.page.html',
  styleUrls: ['./categorynews.page.scss'],
})
export class CategorynewsPage implements OnInit {
  id: any;
  posts: any;
  todayNews: any;
  approveNews: any;
  todayDate: any;
  nottodayNews: any;
  id1: any;
  first: any;
  loading: boolean;

  constructor(private router: Router ,private route: ActivatedRoute,private firestore:AngularFirestore) { 
    this.todayDate = new Date().toString();
    this.todayDate = this.todayDate.substring(0,15)
    console.log(this.todayDate);
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id1 = params.id;
      }
    });
  }

  ngOnInit() {
    this.getNews();
  }
  getNews(){
    this.firestore.collection('News',ref=>ref.orderBy("timeStamp","desc")).snapshotChanges().subscribe(data=>{
      this.posts = data.map(e=>
        {
          return{
            id :e.payload.doc.id,
            Description: e.payload.doc.data()["Description"],
            Title:e.payload.doc.data()["Title"],
            ContName:e.payload.doc.data()["ContName"],
            image:e.payload.doc.data()["image_url"],
            Approve :e.payload.doc.data()["Approve"],
            Date :e.payload.doc.data()["date"],
            count : e.payload.doc.data()["count"],
            timeStamp : e.payload.doc.data()["timeStamp"],
                      
          };        
        })
        this.approveNews = this.posts.filter(item=>item.Approve === 'yes' )
        console.log(this.approveNews);
        
        // this.firestore.collection('News').valueChanges().subscribe(val=>console.log(val));
        if(this.id1 === "1"){
          this.first = this.approveNews.filter(item =>item.Date.substring(0,15) === this.todayDate ).slice(0,1);  
        this.todayNews = this.approveNews.filter(item =>item.Date.substring(0,15) === this.todayDate ).slice(1,);
        console.log(this.first);
        console.log(this.todayNews);
      }
        if(this.id1 === "2"){
          this.first = this.approveNews.filter(item =>item.Date.substring(0,15) !== this.todayDate ).slice(0,1);  
        this.todayNews = this.approveNews.filter(item =>item.Date.substring(0,15) !== this.todayDate).slice(1,);
        console.log(this.first);
        console.log(this.todayNews);
      }
    })
  
  
  
  }
  navigate(id: string, title: string,disc:string,image:string,date:any,count:any,ContName:any) {
    // tslint:disable-next-line: align
    count++;
    this.firestore.collection('News').doc(id).update({
      count  : count
    })
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id" : id,
        "title" : title,
        "Description" : disc,
        "image" : image,
        "date" : date,
        "count" :  count,
        "ContName" : ContName
    }
  };
 
    this.router.navigate(['/newsdisc'], navigationExtras);
  }

  onLoad() {
    this.loading = false;
}
}
