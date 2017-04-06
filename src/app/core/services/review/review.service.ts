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
  reviewDataUrl = 'assets/data/review-items.json';
  errorMessage = 'Review Data could not be retrieved.' +
   '\n 1. Verify ' + this.reviewDataUrl + ' exists. \n 2. JSON Lint the reviews.json file.';

  constructor(private http: Http, private errorHandler: ErrorHandlerService) { }

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

  private handleReviewError(error: any) {
    return this.errorHandler.handleServiceWithMessage(error, this.errorMessage);
  }

  private filterReviews(topicName: string): IReviewItem[] {
    const rs = this.reviews.filter((r) => r.topicName === topicName);
    return (rs.length) ? rs : null;
  }

  private findReviewsObservable(topicName: string): Observable<IReviewItem[]> {
      return this.createObservable(this.filterReviews(topicName));
  }

  private createObservable(data: any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
        observer.next(data);
        observer.complete();
    });
  }
}
