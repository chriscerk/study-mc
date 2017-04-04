import { ErrorHandler } from '@angular/core/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor(private http: Http) { }

  handleError(error: any): void {
    throw new Error('Method not implemented.');
  }

  handleErrorWithMessage(error: any, message: string): void {
    throw new Error(message);
  }

  handleService(error: any) {
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
        return Observable.throw(error || 'Server Error');
    }

   handleServiceWithMessage(error: any, message: string) {
        console.error('StudyMC:', message);
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
        return Observable.throw(error || message);
    }
}
