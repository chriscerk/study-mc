import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICourse } from '../shared/interfaces';

@Component({ 
  //moduleId: module.id,
  selector: 'course',
  template: `
  
  <div class="course view">
        <br />
        <div class="smart-navbar">
            <ul class="nav navbar-nav">
                <li class="toolbar-item">
                    <h3><a routerLink="courses">
                        <div class="message-link">
                            <span class="glyphicon glyphicon-arrow-left" style="margin-right: 30px;"></span>
                            All Courses
                        </div>
                        </a>
                    </h3>
                </li>
            </ul>
        </div>
        <div class="container">
            <router-outlet></router-outlet>
            <br />
            <br />
            <h3><a routerLink="/courses">View all Courses</a></h3>
        </div>
</div>
  
  
  `
})
export class CourseComponent  {
    course: ICourse;
    constructor(private router: Router) { }
}
