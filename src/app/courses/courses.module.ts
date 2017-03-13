import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses.component';
import { courses_routing } from './courses.routing';

@NgModule({
  imports:      [ CommonModule, courses_routing ],
  declarations: [ CoursesComponent ],
  exports:      [ CoursesComponent ]
})
export class CoursesModule { }