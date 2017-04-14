import { AngularFire } from 'angularfire2';
import { IReviewItem } from './../../../shared/models/review';
import { ErrorHandlerService } from './../error-handler/error-handler.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ReviewService {
  reviews: IReviewItem[];
  exampleReviews: IReviewItem[];
  reviewDataUrl = 'assets/data/review-items.json';
  exampleReviewDataUrl = 'assets/data/examplereview-items.json';
  errorMessage = 'Review Data could not be retrieved.' +
   '\n 1. Verify ' + this.reviewDataUrl + ' exists. \n 2. JSON Lint the reviews.json file.';

  constructor(
    private http: Http,
    private af: AngularFire,
    private errorHandler: ErrorHandlerService) { }

  getFirebaseReviews(): Observable<IReviewItem[]> {
    if(!this.reviews) {
      return this.af.database
        .list('/reviews')
        .map((items: IReviewItem[]) => {
                return items;
            }
        )._catch(this.handleReviewError.bind(this));
    } else {
        return this.createObservable(this.reviews);
    }
  }

  getFirebaseReviewsByTopic(topicName: string): Observable<IReviewItem[]> {
    if (this.reviews) {
        return this.findReviewsObservable(topicName);
    } else {
        return Observable.create((observer: Observer<IReviewItem[]>) => {
          this.getFirebaseReviews().subscribe((reviewItems: IReviewItem[]) => {
              this.reviews = reviewItems;
              const items = this.filterReviews(topicName);
              observer.next(items);
              observer.complete();
          });
        })
        .catch(this.handleReviewError.bind(this));
    }
  }

  getFirebaseExampleReviews(): Observable<IReviewItem[]> {
    if(!this.exampleReviews) {
      return this.af.database
        .list('/examplereviews')
        .map((items: IReviewItem[]) => {
                return items;
            }
        )._catch(this.handleReviewError.bind(this));
    } else {
        return this.createObservable(this.reviews);
    }
  }

  getFirebaseExampleReviewsByTopic(topicName: string): Observable<IReviewItem[]> {
    if (this.exampleReviews) {
        return this.findExampleReviewsObservable(topicName);
    } else {
        return Observable.create((observer: Observer<IReviewItem[]>) => {
          this.getFirebaseExampleReviews().subscribe((reviewItems: IReviewItem[]) => {
              this.exampleReviews = reviewItems;
              const items = this.filterReviews(topicName);
              observer.next(items);
              observer.complete();
          });
        })
        .catch(this.handleReviewError.bind(this));
    }
  }

  getReviews(): Observable<IReviewItem[]> {
    if(!this.reviews) {
      return this.http
      .get(this.reviewDataUrl)
      .map((res: Response) => {
          let reviews = res.json();
          return reviews;
      })
      .catch(this.handleReviewError.bind(this));
    } else {
        return this.createObservable(this.reviews);
    }
  }

  getExampleReviews(): Observable<IReviewItem[]> {
    if(!this.exampleReviews) {
      return this.http
      .get(this.exampleReviewDataUrl)
      .map((res: Response) => {
          let reviews = res.json();
          return reviews;
      })
      .catch(this.handleReviewError.bind(this));
    } else {
        return this.createObservable(this.exampleReviews);
    }
  }

  getReviewsByTopic(topicName: string): Observable<IReviewItem[]> {
    if (this.reviews) {
        return this.findReviewsObservable(topicName);
    } else {
        return Observable.create((observer: Observer<IReviewItem[]>) => {
          this.getReviews().subscribe((reviews: IReviewItem[]) => {
              this.reviews = reviews;
              const filteredReviews = this.filterReviews(topicName);
              observer.next(filteredReviews);
              observer.complete();
          });
        })
        .catch(this.handleReviewError.bind(this));
    }
  }

  getExampleReviewsByTopic(topicName: string): Observable<IReviewItem[]> {
    if (this.exampleReviews) {
        return this.findExampleReviewsObservable(topicName);
    } else {
        return Observable.create((observer: Observer<IReviewItem[]>) => {
          this.getExampleReviews().subscribe((reviews: IReviewItem[]) => {
              this.exampleReviews = reviews;
              const filteredReviews = this.filterExampleReviews(topicName);
              observer.next(filteredReviews);
              observer.complete();
          });
        })
        .catch(this.handleReviewError.bind(this));
    }
  }

  private handleReviewError(error: any) {
    return this.errorHandler.handleServiceWithMessage(error, this.errorMessage);
  }

  private filterReviews(topicName: string): IReviewItem[] {
    const rs = this.reviews.filter((r) => r.topicName === topicName);
    return (rs.length) ? rs : null;
  }

  private filterExampleReviews(topicName: string): IReviewItem[] {
    const rs = this.exampleReviews.filter((r) => r.topicName === topicName);
    return (rs.length) ? rs : null;
  }

  private findReviewsObservable(topicName: string): Observable<IReviewItem[]> {
      return this.createObservable(this.filterReviews(topicName));
  }

  private findExampleReviewsObservable(topicName: string): Observable<IReviewItem[]> {
      return this.createObservable(this.filterExampleReviews(topicName));
  }

  private createObservable(data: any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
        observer.next(data);
        observer.complete();
    });
  }
}
