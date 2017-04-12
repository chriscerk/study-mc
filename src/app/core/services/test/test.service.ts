import { AngularFire } from 'angularfire2';
import { ITestItem, TestProblem } from './../../../shared/models/test';
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
  items: TestProblem[];
  courseDataUrl = 'assets/data/test-items.json';
  errorMessage = 'Course Data could not be retrieved.' +
   '\n 1. Verify ' + this.courseDataUrl + ' exists. \n 2. JSON Lint the file. ';

  constructor(
    private http: Http,
    private af: AngularFire,
    private errorHandler: ErrorHandlerService) { }

  getFirebaseTestProblems(): Observable<TestProblem[]> {
    if(!this.items) {
      return this.af.database
        .list('/testproblems')
        .map((items: TestProblem[]) => {
                return items;
            }
        )._catch(this.handleCourseError.bind(this));
    } else {
        return this.createObservable(this.items);
    }
  }

  getFirebaseTestProblemsByTopic(topicName: string): Observable<TestProblem[]> {
    if (this.items) {
        return this.findTopicTestItemsObservable(topicName);
    } else {
        return Observable.create((observer: Observer<TestProblem[]>) => {
          this.getFirebaseTestProblems().subscribe((testProbs: TestProblem[]) => {
              this.items = testProbs;
              const items = this.filterTopicTestItems(topicName);
              observer.next(items);
              observer.complete();
          });
        })
        .catch(this.handleCourseError.bind(this));
    }
  }

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

  getTestItemsByCourse(courseId: number): Observable<TestProblem[]> {
    if (this.items) {
        return this.findCourseTestItemsObservable(courseId);
    } else {
        return Observable.create((observer: Observer<TestProblem[]>) => {
          this.getTestItems().subscribe((items: TestProblem[]) => {
              this.items = items;
              const filteredItems = this.filterCourseTestItems(courseId);
              observer.next(filteredItems);
              observer.complete();
          });
        })
        .catch(this.handleCourseError.bind(this));
    }
  }

  getTestItemsByTopic(topicName: string): Observable<TestProblem[]> {
    if (this.items) {
        return this.findTopicTestItemsObservable(topicName);
    } else {
        return Observable.create((observer: Observer<TestProblem[]>) => {
          this.getTestItems().subscribe((items: TestProblem[]) => {
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

  private filterCourseTestItems(id: number) : TestProblem[] {
    const items = this.items.filter((i) => i.courseId === id);
    return items;
  }

  private findCourseTestItemsObservable(id: number): Observable<TestProblem[]> {
      return this.createObservable(this.filterCourseTestItems(id));
  }

  private filterTopicTestItems(topicName: string): TestProblem[] {
    const items = this.items.filter((i) => i.topicName === topicName);
    return items;
  }

  private findTopicTestItemsObservable(topicName: string): Observable<TestProblem[]> {
      return this.createObservable(this.filterTopicTestItems(topicName));
  }

  private createObservable(data: any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
        observer.next(data);
        observer.complete();
    });
  }
}
