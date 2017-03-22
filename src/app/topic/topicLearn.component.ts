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

type Orientation = ( 'void' | 'next' | 'none' | 'previous' );

@Component({
  selector: 'topic-learn',
  templateUrl: './topicLearn.component.html',
  styleUrls: ['./topic.component.css'],
  animations: [nextPrevAnimation]
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

  constructor(
    private route: ActivatedRoute,
    router: Router, private dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef) {

      this.router = router;
      this.validAnswer = true;
      this.answerSubmitted = false;
      this.userAnswer = 'Current Question Not Answered Yet';
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

      this.orientation = 'void';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  previousItem() {
    this.orientation = 'previous';
    this.changeDetectorRef.detectChanges();

    if(this.currentQuestion == 0)
    {
      return;
    }
    else {
      this.currentQuestion--;
    }

    this.orientation = 'void';
  }

  nextItem() {
    this.orientation = 'next';
    this.changeDetectorRef.detectChanges();

    this.answerSubmitted = false;
    this.userAnswer = 'Current Question Not Answered Yet';
    this.currentQuestion++;

    if(this.topic.learnItems.length == this.currentQuestion)
    {
      this.moduleIsComplete = true;
    }

    this.orientation = 'void';
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
    this.userAnswer = 'Current Question Not Answered Yet';
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
