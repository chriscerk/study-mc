declare var hotspotsModule:any;
declare var fabricProcessor:any;
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ITopic } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';

import { CompoundCanvasComponent } from '../shared/compoundCanvas.component';
import { CanvasAnimationComponent } from '../shared/canvasAnimation.component';
import { AlertBoxComponent } from '../shared/alertBox.component';
import { EndMessageComponent } from '../shared/endMessage.component';
import { nextPrevAnimation } from '../shared/animations';

type Orientation = ( "void" | "next" | "none" | "previous" );

@Component({
  //moduleId: module.id,
  selector: 'topic-learn',
  animations: [nextPrevAnimation],
  template: `
<div *ngIf="topic">
  <h1> <strong>Learn</strong> about {{topic.name}}</h1>

    <div class="content">
      <end-message *ngIf="moduleIsComplete" [topicName]="topic.name" [incorrectAnswers]="incorrectAnswers">
      </end-message>

    <div *ngFor="let learnItem of topic.learnItems; let i = index" [@NextPrevAnimation]="orientation">
      <div *ngIf="currentQuestion == i">

        <h3>{{i/topic.learnItems.length | MyPercentPipe }} Complete</h3>

        <alert-box [learnItem]="learnItem" [validAnswer]="validAnswer" [answerSubmitted]="answerSubmitted"></alert-box>
  
          <p>{{learnItem.title}} | {{learnItem.name}}</p>

            <div class="action-buttons">
              <div class="shaded">
                <button  type="button" class="btn btn-default" (click)="previousItem()"> Previous </button>
                <br>
                <br>
                <button (click)="retryQuestion()" class="btn btn-danger" *ngIf="!validAnswer">Retry</button>
              </div>

              <div *ngIf="learnItem.answer && !answerSubmitted" class="shaded">
                <button type="button" 
                        (click)="rightAnswer()" 
                        class="btn btn-success" 
                        *ngIf="learnItem.answer == userAnswer">
                    Submit
                </button>

                <button type="button" 
                        (click)="wrongAnswer()" 
                        class="btn btn-success" 
                        *ngIf="learnItem.answer != userAnswer && validAnswer">
                    Submit
                </button>
              </div>

              <div *ngIf="!learnItem.answer || answerSubmitted" class="shaded">
                <button type="button" (click)="nextItem()" class="btn btn-success" *ngIf="validAnswer">
                  Next
                </button>
              </div>
            </div>

          <div *ngIf="learnItem.compoundHotspots">
            <compound-Canvas [learnItem]="learnItem" [topic]="topic" [i]="i">Loading Canvas...</compound-Canvas>
          </div>

           <div *ngIf="learnItem.objects">
            <canvas-animation [currentAnimation]="learnItem" [topic]="topic" [i]="i">Loading Canvas...</canvas-animation>
          </div>

          <ul *ngIf="!learnItem.compoundHotspots && !learnItem.objects" class="flex-container">
            <li class="flex-item">
              <img src="/studymc-media/compounds/{{topic.name}}/{{learnItem.imagePath}}" id="logo" alt="logo">
            </li>
            <li class="flex-item" style="width: 400px;">
              <ul>
                <li *ngFor="let info of learnItem.colorLocationAssociations">
                      <p [style.color]=[info.color]> {{info.description}} </p>
                </li>
              </ul>

              <p *ngIf="learnItem.answer">
                {{learnItem.question}}
                <br>
                <br>
                <select class="form-control input-lg" [(ngModel)]="userAnswer" name="userAnswerInput" *ngIf="!answerSubmitted" required>
                  <option [value]="''" disabled="disabled"></option>
                  <option *ngFor="let option of learnItem.options;">{{option}}</option>
                </select>
              </p>
              <br>
            </li>
          </ul>

      </div>
    </div>

    <div *ngIf="!topic.learnItems.length">
        <div class="alert alert-info review-alert" role="alert">
          <a href="#" class="alert-link"> There are currently no Learning items for {{topic.name}}.</a>
        </div>
    </div>
  </div>
  <div *ngIf="!topic" class="row">
    No topic found
  </div>
</div> 
                
`
})
export class TopicLearnComponent implements OnInit {

  topic: ITopic;
  private sub: Subscription;

  router: Router;

  userAnswer: string;
  correctAnswer: string;
  currentQuestion: number;
  validAnswer: boolean;
  answerSubmitted: boolean;
  moduleIsComplete: boolean;
  incorrectAnswers: number;

  currentAction: string;

  public orientation: Orientation;

  constructor(private route: ActivatedRoute, router: Router, private dataService: DataService, private changeDetectorRef: ChangeDetectorRef) {
      this.router = router;
      this.validAnswer = true;
      this.answerSubmitted = false;
      this.userAnswer = "Current Question Not Answered Yet";
      this.currentQuestion = 0;
      this.moduleIsComplete = false;
      this.incorrectAnswers = 0;
      this.currentAction = 'Submit';
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

  previousItem() {
    this.orientation = "previous";
    this.changeDetectorRef.detectChanges();

    if(this.currentQuestion == 0)
    {
      return;
    }
    else{
      this.currentQuestion--;
    }

    this.orientation = "void";
  }

  nextItem(){
    this.orientation = "next";
    this.changeDetectorRef.detectChanges();

    this.answerSubmitted = false;
    this.userAnswer = "Current Question Not Answered Yet";
    this.currentQuestion++;

    if(this.topic.learnItems.length == this.currentQuestion)
    {
      this.moduleIsComplete = true;
    }

    this.orientation = "void";
  }

  wrongAnswer(){
    this.answerSubmitted = true;
    this.validAnswer = false;
    this.incorrectAnswers++;
  }

  rightAnswer(){
    this.answerSubmitted = true;
    this.validAnswer = true;
  }

  retryQuestion(){
    this.answerSubmitted = false;
    this.userAnswer = "Current Question Not Answered Yet";
    this.validAnswer = true;
  }

  performAction(action: string) {
    switch(action) {
      case 'Next' : this.nextItem();
        break;
      case 'Previous' : this.previousItem();
        break;
      case 'Submit' : this.checkAnswer();
        break;
      case 'Retry' : this.retryQuestion();
        break;
    }
  }

  checkAnswer() {   
    if(this.correctAnswer != this.userAnswer) {
      this.wrongAnswer();
      this.currentAction = 'retryQuestion';
    }
    else {
      this.rightAnswer();
      this.currentAction = 'next';
    }
  }

}