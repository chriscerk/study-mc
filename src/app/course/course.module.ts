import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CourseComponent } from './course.component';
import { CourseTopicsComponent } from './courseTopics.component';
import { course_routing } from './course.routing';

@NgModule({
  imports:      [ course_routing, SharedModule ],
  declarations: [ CourseComponent, CourseTopicsComponent ],
  exports: [CourseComponent, CourseTopicsComponent ]
})
export class CourseModule { }
