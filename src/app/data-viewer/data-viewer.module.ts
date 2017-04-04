import { CoursesDataComponent } from './courses-data/courses-data.component';
import { data_viewer_routing } from './data-viewer.routing';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewerComponent } from './data-viewer.component';
import { TestDataComponent } from './test-data/test-data.component';

@NgModule({
  imports:      [ CommonModule, SharedModule, data_viewer_routing ],
  declarations: [ DataViewerComponent, CoursesDataComponent, TestDataComponent ],
  exports:      [ DataViewerComponent, CoursesDataComponent ]
})
export class DataViewerModule { }
