import { Component, OnInit } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { ICourse } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';

@Component({ 
  selector: 'courses', 
  template: `
  <ul class="flex-container">
    <li class="flex-item">
      <div class="landing">
        <h2>{{university}}</h2>
        <h1>{{college}}</h1>
        <div class="title">
          {{appTitle}}
        </div>
      </div>
    </li>
    <li class="flex-item">
      <ul class="flex-container">
        <div *ngFor="let course of courses;">
          <a [routerLink]="['/studymc/course',course.id,'topics']">
            <li class="flex-item classBox hvr-back-pulse {{course.status + '-course' }}">{{course.number}}</li>
          </a>
        </div>
        <div *ngIf="!courses.length">
          <h1>No Courses Found!</h1>
        </div>
      </ul>
    </li>
  </ul>

          `
})
export class CoursesComponent implements OnInit {

  courses: ICourse[] = [];
  filteredCourses: ICourse[] = [];

  appTitle: string;
  college: string;
  university: string;

  constructor(private dataService: DataService) { }
  
  ngOnInit() {
    this.appTitle = 'StudyMC';
    this.college = 'College of Pharmacy';
    this.university = 'University of Michigan';

     this.dataService.getCourses()
        .subscribe((courses: ICourse[]) => {
          this.courses = this.filteredCourses = courses;
        });
  }
}
