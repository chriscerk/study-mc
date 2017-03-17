import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

const about_routes: Routes = [
  { 
    path: '', 
    component: AboutComponent
  }
];

export const about_routing = RouterModule.forChild(about_routes);