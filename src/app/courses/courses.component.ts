import { CourseService } from './../core/services/course/course.service';
import { ICourse } from './../shared/models/course';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../core/services/data.service';

@Component({ 
  selector: 'courses',
  templateUrl: 'courses.component.html',
  styleUrls: ['courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: ICourse[] = [];
  appTitle: string;
  college: string;
  university: string;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.appTitle = 'StudyMC';
    this.college = 'College of Pharmacy';
    this.university = 'University of Michigan';
    this.courseService.getFirebaseCourses()
      .subscribe((courses: ICourse[]) => {
        this.courses = courses;
      });
  }
}
