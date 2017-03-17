import { AboutComponent } from './about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseTopicsComponent } from './course/courseTopics.component';
import { TrainingComponent } from './training/training.component';
import { TopicComponent } from './topic/topic.component';
import { TopicLearnComponent } from './topic/topicLearn.component';
import { TopicTestComponent } from './topic/topicTest.component';
import { TopicReviewComponent } from './topic/topicReview.component';

const app_routes: Routes = [
  { path: 'course', component: CourseComponent},
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
  { path: 'about', component: AboutComponent},
  { path: 'training', component: TrainingComponent},
  { path: '**', pathMatch:'full', redirectTo: 'courses' }
];

export const app_routing = RouterModule.forRoot(app_routes);