import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent }   from './training.component';

const training_routes: Routes = [
  { 
    path: '', 
    component: TrainingComponent
  }
];

export const training_routing = RouterModule.forChild(training_routes);