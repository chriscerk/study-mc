import { AboutInfoComponent } from './about-info.component';
import { AboutHelpComponent } from './about-help.component';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

const about_routes: Routes = [
  { 
    path: 'about', 
    component: AboutComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path:'help',  component: AboutHelpComponent },
      { path:'info',  component: AboutInfoComponent }
    ]
  }
];

export const about_routing = RouterModule.forChild(about_routes);