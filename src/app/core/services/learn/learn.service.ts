import { ILearnItem } from './../../../shared/models/learn';
import { ErrorHandlerService } from './../error-handler/error-handler.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LearnService {
  learns: ILearnItem[];
  learnDataUrl = 'assets/data/learn-items.json';
  errorMessage = 'Learn Data could not be retrieved.' +
   '\n 1. Verify ' + this.learnDataUrl + ' exists. \n 2. JSON Lint the learns.json file.';

  constructor(private http: Http, private errorHandler: ErrorHandlerService) { }

  getLearns(): Observable<ILearnItem[]> {
    if(!this.learns) {
      return this.http
      .get(this.learnDataUrl)
      .map((res: Response) => {
          let learns = res.json();
          return learns;
      })
      .catch(this.handleLearnError.bind(this));
    } else {
        return this.createObservable(this.learns);
    }
  }

  getLearnsByTopic(topicName: string): Observable<ILearnItem[]> {
    if (this.learns) {
        return this.findLearnsObservable(topicName);
    } else {
        return Observable.create((observer: Observer<ILearnItem[]>) => {
          this.getLearns().subscribe((learns: ILearnItem[]) => {
              this.learns = learns;
              const filteredLearns = this.filterLearns(topicName);
              observer.next(filteredLearns);
              observer.complete();
          });
        })
        .catch(this.handleLearnError.bind(this));
    }
  }

  private handleLearnError(error: any) {
    return this.errorHandler.handleServiceWithMessage(error, this.errorMessage);
  }

  private filterLearns(topicName: string): ILearnItem[] {
    const ls = this.learns.filter((l) => l.topicName === topicName);
    return (ls.length) ? ls : null;
  }

  private findLearnsObservable(topicName: string): Observable<ILearnItem[]> {
      return this.createObservable(this.filterLearns(topicName));
  }

  private createObservable(data: any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
        observer.next(data);
        observer.complete();
    });
  }
}
