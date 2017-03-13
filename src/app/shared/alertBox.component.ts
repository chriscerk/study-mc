import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ITopic, ILearnItem, InteractiveMolecule, ITestItem } from '../shared/interfaces';

@Component({ 
  selector: 'alert-box',
  template: 
  `
<div class="alert alert-danger" role="alert" *ngIf="!validAnswer && answerSubmitted">
    <a href="#" class="alert-link">Incorrect Answer!</a>
    <p>Please click "Retry" to attempt answering the question again.</p>
</div>

<div class="alert alert-success" role="alert" *ngIf="validAnswer && answerSubmitted">
    <a href="#" class="alert-link">Correct Answer!</a>
    <p> Correct Answer was {{learnItem.answer}}.</p> 
    <p *ngIf="learnItem.explanation">
        <strong>Why?</strong>: 
        {{learnItem.explanation}}
    </p>
</div>
`,
  styles: [],
})
export class AlertBoxComponent implements OnInit, AfterViewInit {
    @Input() learnItem: ILearnItem;
    @Input() testItem: ITestItem;
    @Input() validAnswer: boolean;
    @Input() answerSubmitted: boolean;
  
    constructor() { }

    ngOnInit() {
      
    }

    ngAfterViewInit() {
    }
}