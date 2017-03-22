import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITopic } from '../shared/interfaces';
import { MyPercentPipe } from '../shared/pipes/percent.pipe'


@Component({
  selector: 'topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})

export class TopicComponent implements OnInit {
    displayMode: TopicDisplayModeEnum;
    displayModeEnum = TopicDisplayModeEnum;
    topic: ITopic;

    constructor(private router: Router) { }

    ngOnInit() {
      const path = this.router.url.split('/')[3];
      switch (path) {
        case 'review':
          this.displayMode = TopicDisplayModeEnum.Review;
          break;
        case 'learn':
          this.displayMode = TopicDisplayModeEnum.Learn;
          break;
        case 'test':
          this.displayMode = TopicDisplayModeEnum.Test;
          break;
        default:
          this.displayMode = TopicDisplayModeEnum.Learn;
          break;
      }
    }
}

enum TopicDisplayModeEnum {
  Learn= 0,
  Test= 1,
  Review= 2
}
