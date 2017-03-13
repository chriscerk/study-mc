import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseComponent } from './course.component';
import { CourseTopicsComponent } from './courseTopics.component';

import { course_routing } from './course.routing';

@NgModule({
  imports:      [ CommonModule, course_routing ],
  declarations: [ CourseComponent, CourseTopicsComponent ],
  exports: [CourseComponent, CourseTopicsComponent ]
})
export class CourseModule { }