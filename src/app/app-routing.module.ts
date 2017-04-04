import { DataViewerComponent } from './data-viewer/data-viewer.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutInfoComponent } from './about/about-info.component';
import { AboutHelpComponent } from './about/about-help.component';
import { LocationStrategy } from '@angular/common';
import { BaseHrefHashLocationStrategy } from './core/strategies/base-href-hash-location.strategy';
import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseTopicsComponent } from './course/courseTopics.component';
import { TrainingComponent } from './training/training.component';
import { TopicComponent } from './topic/topic.component';
import { TopicLearnComponent } from './topic/topicLearn.component';
import { TopicTestComponent } from './topic/topicTest.component';
import { TopicReviewComponent } from './topic/topicReview.component';

const app_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/courses' },
  { path: 'courses', component: CoursesComponent},
  { path: 'course/:id', component: CourseComponent,
      children: [
        { path: '', redirectTo: '/topics', pathMatch: 'full' },
        { path: 'topics', component: CourseTopicsComponent},
      ]
  },
  { path: 'topic/:id', component: TopicComponent,
      children: [
        { path: '', redirectTo: '/learn', pathMatch: 'full' },
        { path: 'learn', component: TopicLearnComponent},
        { path: 'test', component: TopicTestComponent},
        { path: 'review', component: TopicReviewComponent}
      ]
  },
  { path: 'about', component: AboutComponent,
    children: [
        { path: '', redirectTo: '/info', pathMatch: 'full' },
        { path: 'help', component: AboutHelpComponent},
        { path: 'info', component: AboutInfoComponent}
      ]
  },
  { path: 'data-viewer', component: DataViewerComponent},
  { path: 'training', component: TrainingComponent},
  { path: '**', pathMatch: 'full', redirectTo: '/courses'  }
];

@NgModule({
  imports: [ RouterModule.forRoot(app_routes, {useHash: true}) ],
  providers: [ { provide: APP_BASE_HREF, useValue: '/study-mc/'}, {provide: LocationStrategy, useClass: BaseHrefHashLocationStrategy} ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
