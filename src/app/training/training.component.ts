import { INotification } from './../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import {NotificationsService, SimpleNotificationsComponent, PushNotificationsService} from 'angular2-notifications';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  constructor(private _service: NotificationsService,
        private _push: PushNotificationsService) { }

  ngOnInit() {
  }


    public title: string = 'just a title';
    public content: string = 'just content';
    public type: string = 'success';

    public deleteId: string;

    public temp: boolean[] = [true, false];

    public options = {
        timeOut: 5000,
        lastOnBottom: true,
        clickToClose: true,
        maxLength: 0,
        maxStack: 7,
        showProgressBar: true,
        pauseOnHover: true,
        preventDuplicates: false,
        preventLastDuplicates: 'visible',
        rtl: false,
        animate: 'scale',
        position: ['right', 'bottom']
    };

    private html = `<p>Test</p><p>A nother test</p>`;

    // createPush() {
    //     this._push.create({title: "test", body: "bla"})
    // }


    create() {
        switch (this.type) {
            case 'success':
                let a = this._service.success(this.title, this.content, {id: 123});
                break;
            case 'alert':
                this._service.alert(this.title, this.content);
                break;
            case 'error':
                this._service.error(this.title, this.content);
                break;
            case 'info':
                this._service.info(this.title, this.content);
                break;
            case 'bare':
                this._service.bare(this.title, this.content);
                break;
        }
    }

    withOverride() { this._service.create('pero', 'peric', 'success', {timeOut: 0, clickToClose: false, maxLength: 3, showProgressBar: true, theClass: 'overrideTest'}) }

    withHtml() {this._service.html(this.html, 'success') }

    removeAll() { this._service.remove() }

    onCreate(event) {
        console.log(event);
    }

    onDestroy(event) {
        console.log(event);
    }

    getPermission() {
        //this._push.getPermission();
    }

    createPush() {
        this._push.create('Test', {body: 'bla'}).subscribe(
            res => console.log(res),
            err => console.log(err),
            com => console.log('in complete: ', com)
        )
    }
    
    cleanSingle() {
        console.log(this.deleteId);
        this._service.remove(this.deleteId);
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
