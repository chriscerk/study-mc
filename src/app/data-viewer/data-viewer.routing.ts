import { ReviewDataComponent } from './review-data/review-data.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { TestDataComponent } from './test-data/test-data.component';
import { CoursesDataComponent } from './courses-data/courses-data.component';
import { DataViewerComponent } from './data-viewer.component';
import { Routes, RouterModule } from '@angular/router';

const data_viewer_routes: Routes = [
  {
    path: 'data-viewer',
    component: DataViewerComponent,
    children: [
      { path: '', redirectTo: 'admin-login', pathMatch: 'full' },
      { path: 'admin-login',  component: AdminLoginComponent },
      { path: 'courses',  component: CoursesDataComponent },
      { path: 'test',  component: TestDataComponent },
      { path: 'review',  component: ReviewDataComponent }
    ]}
];

export const data_viewer_routing = RouterModule.forChild(data_viewer_routes);
