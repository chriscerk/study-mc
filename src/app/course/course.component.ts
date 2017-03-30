import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICourse } from '../shared/interfaces';

@Component({ 
  selector: 'course',
  templateUrl: 'course.component.html'
})
export class CourseComponent  {
    course: ICourse;
    constructor(private router: Router) { }
}
