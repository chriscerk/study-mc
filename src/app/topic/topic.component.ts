import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITopic } from '../shared/interfaces';
import { MyPercentPipe } from '../shared/pipes/percent.pipe'

@Component({ 
  //moduleId: module.id,
  selector: 'topic',
  template: `
  
  <div class="topic view">
        <div class="navbar smart-navbar review-print-hide">
            <ul class="nav navbar-nav">
                <li class="toolbar-item">
                    <a routerLink="learn" 
                       (click)="displayMode = displayModeEnum.Learn" 
                       [class.active]="displayMode === displayModeEnum.Learn">
                       <span class="glyphicon glyphicon-education"></span>&nbsp;&nbsp;
                       <span class ="graphic-title">Learn</span>
                    </a>
                </li>
                <li class="toolbar-item">
                    <a routerLink="test"
                       (click)="displayMode = displayModeEnum.Test" 
                       [class.active]="displayMode === displayModeEnum.Test">
                        <span class="glyphicon glyphicon-pencil"></span>&nbsp;&nbsp;
                        <span class ="graphic-title">Test</span>
                    </a>
                </li>
                <li class="toolbar-item">
                    <a routerLink="review"
                       (click)="displayMode = displayModeEnum.Review" 
                       [class.active]="displayMode === displayModeEnum.Review">
                        <span class="glyphicon glyphicon-repeat"></span>&nbsp;&nbsp;
                        <span class ="graphic-title">Review</span>
                    </a>
                </li>
            </ul>
        </div>
            <router-outlet></router-outlet>
            <br />
            <br />
</div>
 
  
  `
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
  Learn=0,
  Test=1,
  Review=2
}