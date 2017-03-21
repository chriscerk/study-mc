import { INotification } from './../shared/interfaces';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //Eventually use INotification

  public notification: any = {
    show: false,
    title: 'Exam on 3/21/2017!',
    body: 'You have an exam approaching',
    icon: 'assets/media/logos/icon-logo-144.png',
    action: function () {
      window.open('https://apps.phar.umich.edu/study-mc/');
    }
  };
  
  showNotification(notification){
    notification.show();
  }

}
