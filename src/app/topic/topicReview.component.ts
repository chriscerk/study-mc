import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ITopic } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';
import { nextPrevAnimation } from '../shared/animations';

type Orientation = ( "void" | "next" | "none" | "previous" );

@Component({
  //moduleId: module.id,
  selector: 'topic-review',
  animations: [nextPrevAnimation],
  template: `
<div *ngIf="topic">
<div class="review-print-hide">
  <h1><b>Review</b> of {{topic.name}}</h1>
  <div class="alert alert-info review-alert" role="alert" style="display:none;">
    <a href="#" class="alert-link">Autofill only on mobile device.</a>
      <div class="action-buttons">
        <div class="shaded">
          <button type="button" class="btn btn-success shaded" (click)="generateExampleReview()"> Autofill </button>
        </div>
      </div>
  </div>
  <p class="advice">Please fill each section of the review. Below is a generated review worksheet, printable upon completion. <a href="/studymc-media/savePDF-HowTo-studymc.mp4">How to Save Review Worksheet as a PDF Video</a></p>
<div class="content review-module">
  <form #f="ngForm" (ngSubmit)="onSubmit()" method="post">

      <div class="action-buttons shaded">
        <div class="shaded">
          <button type="button" class="btn btn-default shaded" (click)="generateExampleReview()"> Autofill </button>
        </div>
        <br>
         <div class="shaded">
          <button type="button" class="btn btn-default" (click)="toPreviousItem()"> Previous </button>
         </div>
          <br>
         <div class="shaded">
          <button type="button" class="btn btn-default" *ngIf="reviewComplete" (click)="toNextItem()"> Next </button>
         </div>
            <br>
            <button type="submit" class="btn btn-success" *ngIf="!reviewComplete" (click)="toNextItem()"> Next </button>
            <button type="submit" class="btn btn-success" *ngIf="reviewComplete" (click)="printPage()"> Print! </button>
        </div>

  <div *ngFor="let reviewItem of topic.reviewItems; let i = index" [@NextPrevAnimation]="orientation">
    <div *ngIf="currentItem == i">    
        <h2>Section {{i+1}}: {{reviewItem.title}}</h2> 

        <ul class="flex-container">
          <li *ngFor="let section of reviewItem.sections; let j = index">
            <div class="input-group input-group-lg">
              <input type="text" 
                      class="form-control" 
                      [(ngModel)]="section.title" 
                      aria-describedby="basic-addon1" 
                      name="sectionTitle{{j}}" 
                      required>
              <br>
              <div *ngIf="section.imagePath">
                <img src="/studymc-media/compounds/{{topic.name}}/{{section.imagePath}}" id="logo" alt="{{section.imagePath}}" style="max-width: 150px;">
              </div>
              <div *ngIf="!section.imagePath">
                <textarea class="form-control" 
                          [(ngModel)]="section.content" 
                          name="sectionContent{{j}}" 
                          rows="10" rows="5" 
                          id="comment" 
                          required>
                </textarea>
                </div>
              <br>
            </div>
            <br>
          </li>
        </ul>

      </div>
  </div>
  <div class="input-group input-group-lg">
          <label for="studentName">Your Name: </label>
          <input type="text" class="form-control" [(ngModel)]="studentName" name="studentName" required>
  </div>
  <div *ngIf="!topic.reviewItems.length">
        <div class="alert alert-info review-alert" role="alert">
          <a href="#" class="alert-link"> There is currently no Review for {{topic.name}}.</a>
        </div>
  </div>
  <hr>
    <h2 style="text-align: center"> Preview Below &nbsp;  <span class="glyphicon glyphicon-arrow-down"></span></h2> 
  <hr>
  </form>
 </div>
</div>
  <h1 style="text-align: center;">Review of <strong>{{topic.name}}</strong> | {{studentName}} </h1>
    <ul class="flex-container">
        <li *ngFor="let reviewItem of topic.reviewItems;" class="flex-item review-print-item">
            <h3><strong>{{reviewItem.title}}</strong></h3>

            <ul class="flex-container" style="border: solid #afafaf; border-width: 1px; border-radius: 10px;">
              <li *ngFor="let section of reviewItem.sections" style="width: 250px; padding: 3px;">
                <h4>{{section.title}}</h4>
                <p class="review">{{section.content}}</p>
                <div *ngIf="section.imagePath">
                  <img src="/studymc-media/compounds/{{topic.name}}/{{section.imagePath}}" id="logo" alt="{{section.imagePath}}" style="max-width: 150px;">
                </div>  
              </li>
            </ul>
      </li>
    </ul>
</div>

<div *ngIf="!topic" class="row">
No topic found
</div> 
`
})

//For each item in the review sheet provide a userSubmission. Items should be userProvided or fixed

export class TopicReviewComponent implements OnInit {

  topic: ITopic;
  private sub: Subscription;
  router: Router;

  studentName: string;
  currentItem: number;
  nextItem:number;
  lastItem:number;
  printingOptionsVisible: boolean;
  reviewComplete: boolean;

  public orientation: Orientation;

  constructor(private route: ActivatedRoute, router: Router, private dataService: DataService, private changeDetectorRef: ChangeDetectorRef) {
      this.router = router;
      this.studentName = "";
      this.currentItem = 0;
      this.nextItem = 1;
      this.printingOptionsVisible = false;
      this.reviewComplete = false;
      this.changeDetectorRef = changeDetectorRef;
   } 

  ngOnInit() {
      this.sub = this.route.parent.params.subscribe(params => {
        let id = +params['id'];
        this.dataService.getTopic(id)
            .subscribe((topic: ITopic) => this.topic = topic);
      });

      this.lastItem = this.topic.reviewItems.length - 1;
      this.orientation = "void";
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toNextItem() {
    this.orientation = "next";
    this.changeDetectorRef.detectChanges();

    if(this.currentItem == this.lastItem)
    {
        this.currentItem = 0;
    }
    else if(this.nextItem == this.lastItem)
    {
      this.reviewComplete = true;
      this.currentItem++;
    }
    else{
      this.currentItem++;
    }
    this.nextItem = this.currentItem + 1;
    this.orientation = "void";
  }

  toPreviousItem() {
    this.orientation = "previous";
    this.changeDetectorRef.detectChanges();

    if(this.currentItem == 0)
    {
      this.currentItem = this.lastItem;
    }
    else{
      this.currentItem--;
    }
    this.nextItem = this.currentItem + 1;
    this.orientation = "void";
  }

  printPage() {
    window.print();
  }

  generateExampleReview() {
    this.topic.reviewItems = this.topic.exampleReview;
    this.studentName = "MC Student";
    this.reviewComplete = true;
  }


  togglePrintingOptions(){
    this.printingOptionsVisible = !this.printingOptionsVisible;
  }

}