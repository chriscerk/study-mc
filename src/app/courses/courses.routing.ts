import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';

const courses_routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'studymc/courses' },
  { path: 'studymc/courses', component: CoursesComponent}
];

export const courses_routing = RouterModule.forChild(courses_routes);