import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutakot',
  templateUrl: './aboutakot.page.html',
  styleUrls: ['./aboutakot.page.scss'],
})
export class AboutakotPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  
  goBack()
{
    window.history.back();
}

}
