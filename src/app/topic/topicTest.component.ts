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


type Orientation = ( 'void' | 'next' | 'none' | 'previous' );

@Component({
  selector: 'topic-test',
  templateUrl: './topicTest.component.html',
  styleUrls: ['./topicTest.component.css'],
  animations: [nextPrevAnimation]
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

  constructor(
    private route: ActivatedRoute,
    router: Router,
    private dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef) {

      this.router = router;
      this.validAnswer = true;
      this.userAnswer = 'Current Question Not Answered Yet';
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

      this.orientation = 'void';
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
    this.orientation = 'next';
    this.changeDetectorRef.detectChanges();

    this.userAnswer = 'Current Question Not Answered Yet';
    this.currentQuestion++;

    if(this.topic.testItems.length == this.currentQuestion)
    {
      this.moduleIsComplete = true;
    }
    this.orientation = 'void';
  }

  wrongAnswer(){
    this.validAnswer = false;
  }

  retryQuestion(){
    this.userAnswer = 'Current Question Not Answered Yet';
    this.validAnswer = true;
    this.incorrectAnswers++;
  }
}
