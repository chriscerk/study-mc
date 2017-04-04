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
  courseDataUrl = 'assets/data/courses.json';
  errorMessage = 'Course Data could not be retrieved.' +
   '\n 1. Verify ' + this.courseDataUrl + ' exists. \n 2. JSON Lint the courses.json file.';

  constructor(private http: Http, private errorHandler: ErrorHandlerService) { }

  getCourses(): Observable<ICourse[]> {
        return this.http
          .get(this.courseDataUrl)
          .map((res: Response) => {
              let courses = res.json();
              return courses;
          })
          .catch(this.handleCourseError.bind(this));
    }

    handleCourseError(error: any) {
      return this.errorHandler.handleWithMessage(error, this.errorMessage);
    }
}
