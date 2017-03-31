import { ICourse } from './../shared/models/course';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({ 
  selector: 'course',
  templateUrl: 'course.component.html'
})
export class CourseComponent  {
    course: ICourse;
    constructor(private router: Router) { }
}
