import { IReviewItem } from './../shared/models/review';
import { ReviewService } from './../core/services/review/review.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { nextPrevAnimation } from '../shared/animations';


type Orientation = ( 'void' | 'next' | 'none' | 'previous' );

@Component({
  selector: 'topic-review',
  templateUrl: './topicReview.component.html',
  styleUrls: ['./topic.component.css'],
  animations: [nextPrevAnimation]
})

export class TopicReviewComponent implements OnInit {

  reviewItems: IReviewItem[];
  exampleReviewItems: IReviewItem[];
  topicName: string;
  private sub: Subscription;
  router: Router;
  studentName: string;
  currentItem: number;
  nextItem: number;
  lastItem: number;
  printingOptionsVisible: boolean;
  reviewComplete: boolean;
  public orientation: Orientation;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    private reviewService: ReviewService,
    private changeDetectorRef: ChangeDetectorRef) {

      this.router = router;
      this.changeDetectorRef = changeDetectorRef;
      this.studentName = '';
      this.currentItem = 0;
      this.nextItem = 1;
      this.printingOptionsVisible = false;
      this.reviewComplete = false;
   }

  ngOnInit() {
      this.reviewItems = [];

      this.sub = this.route.parent.params.subscribe(params => {
        this.topicName = params['name'];
        this.reviewService.getFirebaseReviewsByTopic(this.topicName)
            .subscribe((items: IReviewItem[]) => this.reviewItems = items);
      });

      this.orientation = 'void';

      this.reviewService.getFirebaseExampleReviewsByTopic(this.topicName)
            .subscribe((items: IReviewItem[]) => this.exampleReviewItems = items);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toNextItem() {

    if(!this.lastItem) {
      this.lastItem = this.reviewItems ? this.reviewItems.length - 1 : 0;
    }

    this.orientation = 'next';
    this.changeDetectorRef.detectChanges();

    if(this.currentItem == this.lastItem) {
        this.currentItem = 0;
    }
    else if(this.nextItem == this.lastItem) {
      this.reviewComplete = true;
      this.currentItem++;
    }
    else {
      this.currentItem++;
    }
    this.nextItem = this.currentItem + 1;
    this.orientation = 'void';
  }

  toPreviousItem() {
    this.orientation = 'previous';
    this.changeDetectorRef.detectChanges();

    if(this.currentItem == 0) {
      this.currentItem = this.lastItem;
    }
    else {
      this.currentItem--;
    }
    this.nextItem = this.currentItem + 1;
    this.orientation = 'void';
  }

  printPage() {
    window.print();
  }

  generateExampleReview() {

    if(this.exampleReviewItems) {
      this.reviewItems = this.exampleReviewItems;
    }
    this.studentName = 'MC Student';
    this.reviewComplete = true;
  }


  togglePrintingOptions() {
    this.printingOptionsVisible = !this.printingOptionsVisible;
  }

}
