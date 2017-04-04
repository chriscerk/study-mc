import { DataViewerModule } from './data-viewer/data-viewer.module';
import { APP_BASE_HREF } from '@angular/common';
import { AboutModule } from './about/about.module';
import { TrainingModule } from './training/training.module';
import { TopicModule } from './topic/topic.module';
import { CourseModule } from './course/course.module';
import { CoursesModule } from './courses/courses.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { TrainingComponent } from './training/training.component';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AboutModule,
    CoursesModule,
    CourseModule,
    TopicModule,
    DataViewerModule,
    TrainingModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ AppComponent, TrainingComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
