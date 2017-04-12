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
      this.studentName = '';
      this.currentItem = 0;
      this.nextItem = 1;
      this.printingOptionsVisible = false;
      this.reviewComplete = false;
      this.changeDetectorRef = changeDetectorRef;
   } 

  ngOnInit() {
      this.sub = this.route.parent.params.subscribe(params => {
        let name = params['name'];
        this.reviewService.getReviewsByTopic(name)
            .subscribe((items: IReviewItem[]) => this.reviewItems = items);
      });

      this.lastItem = this.reviewItems.length - 1;
      this.orientation = 'void';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toNextItem() {
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
    this.reviewItems = null; //this.reviewService.getExampleReviewsByTopic();
    this.studentName = 'MC Student';
    this.reviewComplete = true;
  }


  togglePrintingOptions() {
    this.printingOptionsVisible = !this.printingOptionsVisible;
  }

}
