import { Routes, RouterModule } from '@angular/router';

import { TopicComponent }   from './topic.component';
import { TopicLearnComponent } from './topicLearn.component';
import { TopicTestComponent } from './topicTest.component';
import { TopicReviewComponent } from './topicReview.component';

const topic_routes: Routes = [
  { 
    path: '', 
    component: TopicComponent,
    children: [
      { path:'learn',  component: TopicLearnComponent },
      { path:'test', component: TopicTestComponent },
      { path:'review', component: TopicReviewComponent }
    ]
  }
];

export const topic_routing = RouterModule.forChild(topic_routes);