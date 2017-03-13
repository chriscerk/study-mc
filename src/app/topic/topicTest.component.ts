import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ITopic } from '../shared/interfaces';
import { MyPercentPipe } from '../shared/pipes/percent.pipe'
import { AlertBoxComponent } from '../shared/alertBox.component';
import { EndMessageComponent } from '../shared/endMessage.component';
import { nextPrevAnimation } from '../shared/animations';

import { DataService } from '../core/services/data.service';

type Orientation = ( "void" | "next" | "none" | "previous" );

@Component({
  selector: 'topic-test',
  animations: [nextPrevAnimation],
  template: `
<div *ngIf="topic">
  <h1><b>Test</b> your Knowledge on {{topic.name}}</h1>
<div class="content">
  <end-message *ngIf="moduleIsComplete" [topicName]="topic.name" [incorrectAnswers]="incorrectAnswers"></end-message>
    <div *ngFor="let testItem of topic.testItems; let i = index" [@NextPrevAnimation]="orientation">
      <div *ngIf="currentQuestion == i">
        <br>
          <h2> {{i/topic.testItems.length | MyPercentPipe }} Complete</h2> 
        <br>
        <form #f="ngForm" (ngSubmit)="onSubmit(testItem.answer)" *ngIf="validAnswer" method="post">
          <p class="test-question">
            {{testItem.question}}
            <br>
            <br>
            <select class="form-control input-lg" [(ngModel)]="userAnswer" name="userAnswerInput" required>
              <option  value="" selected="selected" disabled="disabled"></option>
              <option *ngFor="let option of testItem.options;">{{option}}</option>
            </select>
          </p>
          <div class="action-buttons shaded">
            <button type="submit" class="btn btn-success">Submit</button>
          </div>
        </form>

        <div class="action-buttons shaded">
          <button (click)="retryQuestion()" class="btn btn-danger" *ngIf="!validAnswer">Retry</button>
        </div>

         <div class="alert alert-danger" role="alert" *ngIf="!validAnswer">
            <a href="#" class="alert-link">Incorrect Answer!</a>
         </div>

      </div>
    </div>

    <div *ngIf="!topic.testItems.length">
        <div class="alert alert-info review-alert" role="alert">
          <a href="#" class="alert-link"> There are currently no Test items for {{topic.name}}.</a>
        </div>
    </div>

</div>
<div *ngIf="!topic" class="row">
  No topic found
</div>
</div>
                
`
})
export class TopicTestComponent implements OnInit {

  topic: ITopic;
  private sub: Subscription;

  router: Router;

  userAnswer: string;
  correctAnswer: string;
  currentQuestion: number;
  validAnswer: boolean;
  incorrectAnswers: number;
  moduleIsComplete: boolean;

  public orientation: Orientation;

  constructor(private route: ActivatedRoute, router: Router, private dataService: DataService, private changeDetectorRef: ChangeDetectorRef) {
      this.router = router;
      this.validAnswer = true;
      this.userAnswer = "Current Question Not Answered Yet";
      this.currentQuestion = 0;
      this.incorrectAnswers = 0;
      this.moduleIsComplete = false;
      this.changeDetectorRef = changeDetectorRef;
   } 

  ngOnInit() {
      this.sub = this.route.parent.params.subscribe(params => {
        let id = +params['id'];
        this.dataService.getTopic(id)
            .subscribe((topic: ITopic) => this.topic = topic);
      });

      this.orientation = "void";
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(answer: string) {
    this.correctAnswer = answer;
    if(this.userAnswer == this.correctAnswer){
      this.nextQuestion();
    }
    else if(this.userAnswer != this.correctAnswer) {
      this.wrongAnswer();
    }
  }

  nextQuestion() : void {
    this.orientation = "next";
    this.changeDetectorRef.detectChanges();

    this.userAnswer = "Current Question Not Answered Yet";
    this.currentQuestion++;

    if(this.topic.testItems.length == this.currentQuestion)
    {
      this.moduleIsComplete = true;
    }
    this.orientation = "void";
  }

  wrongAnswer(){
    this.validAnswer = false;
  }

  retryQuestion(){
    this.userAnswer = "Current Question Not Answered Yet";
    this.validAnswer = true;
    this.incorrectAnswers++;
  }

}