import { TestDataComponent } from './test-data/test-data.component';
import { CoursesDataComponent } from './courses-data/courses-data.component';
import { DataViewerComponent } from './data-viewer.component';
import { Routes, RouterModule } from '@angular/router';


const data_viewer_routes: Routes = [
  {
    path: 'data-viewer',
    component: DataViewerComponent,
    children: [
      { path: '', redirectTo: 'courses', pathMatch: 'full' },
      { path: 'courses',  component: CoursesDataComponent },
      { path: 'test',  component: TestDataComponent }
    ]}
];

export const data_viewer_routing = RouterModule.forChild(data_viewer_routes);
