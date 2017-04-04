import { ErrorHandlerService } from './../error-handler/error-handler.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ICourse } from './../../../shared/models/course';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CourseService {
  courses: ICourse[];
  courseDataUrl = 'assets/data/courses.json';
  errorMessage = 'Course Data could not be retrieved.' +
   '\n 1. Verify ' + this.courseDataUrl + ' exists. \n 2. JSON Lint the courses.json file.';

  constructor(private http: Http, private errorHandler: ErrorHandlerService) { }

  getCourses(): Observable<ICourse[]> {
    if(!this.courses) {
      return this.http
      .get(this.courseDataUrl)
      .map((res: Response) => {
          let courses = res.json();
          return courses;
      })
      .catch(this.handleCourseError.bind(this));
    } else {
        return this.createObservable(this.courses);
    }
  }

  getCourse(id: number): Observable<ICourse> {
    if (this.courses) {
        return this.findCourseObservable(id);
    } else {
        return Observable.create((observer: Observer<ICourse>) => {
          this.getCourses().subscribe((courses: ICourse[]) => {
              this.courses = courses;
              const course = this.filterCourses(id);
              observer.next(course);
              observer.complete();
          });
        })
        .catch(this.handleCourseError.bind(this));
    }
  }

  private handleCourseError(error: any) {
    return this.errorHandler.handleServiceWithMessage(error, this.errorMessage);
  }

  private filterCourses(id: number) : ICourse {
    const cs = this.courses.filter((c) => c.id === id);
    return (cs.length) ? cs[0] : null;
  }

  private findCourseObservable(id: number) : Observable<ICourse> {
      return this.createObservable(this.filterCourses(id));
  }

  private createObservable(data: any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
        observer.next(data);
        observer.complete();
    });
  }
}
