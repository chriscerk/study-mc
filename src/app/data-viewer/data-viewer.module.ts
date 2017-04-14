import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CoursesDataComponent } from './courses-data/courses-data.component';
import { data_viewer_routing } from './data-viewer.routing';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewerComponent } from './data-viewer.component';
import { TestDataComponent } from './test-data/test-data.component';
import { ReviewDataComponent } from './review-data/review-data.component';
import { ExampleReviewDataComponent } from './example-review-data/example-review-data.component';

@NgModule({
  imports: [ CommonModule, SharedModule, data_viewer_routing ],
  declarations: [
    DataViewerComponent,
    CoursesDataComponent,
    TestDataComponent,
    AdminLoginComponent,
    ReviewDataComponent,
    ExampleReviewDataComponent
  ],
  exports: [
    DataViewerComponent,
    CoursesDataComponent,
    TestDataComponent,
    AdminLoginComponent,
    ReviewDataComponent,
    ExampleReviewDataComponent
  ]
})
export class DataViewerModule { }
