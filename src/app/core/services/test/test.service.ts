import { ITestItem } from './../../../shared/models/test';
import { ErrorHandlerService } from './../error-handler/error-handler.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TestService {
  items: ITestItem[];
  courseDataUrl = 'assets/data/test-items.json';
  errorMessage = 'Course Data could not be retrieved.' +
   '\n 1. Verify ' + this.courseDataUrl + ' exists. \n 2. JSON Lint the file.';

  constructor(private http: Http, private errorHandler: ErrorHandlerService) { }

  getTestItems(): Observable<ITestItem[]> {
    if(!this.items) {
      return this.http
      .get(this.courseDataUrl)
      .map((res: Response) => {
          let items = res.json();
          return items;
      })
      .catch(this.handleCourseError.bind(this));
    } else {
        return this.createObservable(this.items);
    }
  }

  getTestItemsByCourse(courseId: number): Observable<ITestItem[]> {
    if (this.items) {
        return this.findCourseTestItemsObservable(courseId);
    } else {
        return Observable.create((observer: Observer<ITestItem[]>) => {
          this.getTestItems().subscribe((items: ITestItem[]) => {
              this.items = items;
              const filteredItems = this.filterCourseTestItems(courseId);
              observer.next(filteredItems);
              observer.complete();
          });
        })
        .catch(this.handleCourseError.bind(this));
    }
  }

  getTestItemsByTopic(topicName: string): Observable<ITestItem[]> {
    if (this.items) {
        return this.findTopicTestItemsObservable(topicName);
    } else {
        return Observable.create((observer: Observer<ITestItem[]>) => {
          this.getTestItems().subscribe((items: ITestItem[]) => {
              this.items = items;
              const filteredItems = this.filterTopicTestItems(topicName);
              observer.next(filteredItems);
              observer.complete();
          });
        })
        .catch(this.handleCourseError.bind(this));
    }
  }

  private handleCourseError(error: any) {
    return this.errorHandler.handleServiceWithMessage(error, this.errorMessage);
  }

  private filterCourseTestItems(id: number) : ITestItem[] {
    const items = this.items.filter((i) => i.courseId === id);
    return items;
  }

  private findCourseTestItemsObservable(id: number) : Observable<ITestItem[]> {
      return this.createObservable(this.filterCourseTestItems(id));
  }

  private filterTopicTestItems(topicName: string): ITestItem[] {
    const items = this.items.filter((i) => i.topicName === topicName);
    return items;
  }

  private findTopicTestItemsObservable(topicName: string) : Observable<ITestItem[]> {
      return this.createObservable(this.filterTopicTestItems(topicName));
  }

  private createObservable(data: any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
        observer.next(data);
        observer.complete();
    });
  }
}
