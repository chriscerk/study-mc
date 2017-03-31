import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface INotification {
    show: boolean;
    title: string;
    body: string;
    icon: string;
    action: any;
}

@Injectable()
export class DataService {
    _baseUrl: string = 'assets/data/';
    _fileName: string = 'notifications.json';
    notifications: INotification[];

    constructor(private http: Http) { }

    getNotifications(): Observable<INotification[]> {
        return this.http.get(this._baseUrl + this._fileName)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getNotificationByDate(date: string): Observable<INotification> {
        return this.http.get(this._baseUrl + this._fileName)
            .map((res: Response) => {
                let notifications = res.json();
                for(let notification of notifications) {
                    if(notification.date == date) {
                        return notification;
                    }
                }
            })
            .catch(this.handleError);
    }

    handleError(error: any) {
        console.error('server error:', error); 
        if (error instanceof Response) {
          let errMessage = '';
          try {
            errMessage = error.json().error;
          } catch(err) {
            errMessage = error.statusText;
          }
          return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Node.js server error');
    }
}
