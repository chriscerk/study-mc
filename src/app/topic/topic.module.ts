import { NgModule } from '@angular/core';
import { TopicComponent } from './topic.component';
import { TopicLearnComponent } from './topicLearn.component';
import { TopicTestComponent } from './topicTest.component';
import { TopicReviewComponent } from './topicReview.component';
import { SharedModule } from '../shared/shared.module';
import { topic_routing } from './topic.routing';

@NgModule({
  imports:      [ topic_routing, SharedModule ],
  declarations: [ TopicComponent, TopicLearnComponent, TopicTestComponent, TopicReviewComponent],
  exports: [ TopicComponent ],
  bootstrap: [ TopicLearnComponent ]
})
export class TopicModule { }
