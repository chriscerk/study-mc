import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses.component';
import { courses_routing } from './courses.routing';

@NgModule({
  imports:      [ CommonModule, courses_routing, SharedModule ],
  declarations: [ CoursesComponent ],
  exports:      [ CoursesComponent ]
})
export class CoursesModule { }
