import { ITestItem } from './../../models/test';
import { ILearnItem } from './../../models/learn';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({ 
  selector: 'alert-box',
  templateUrl: 'alert-box.component.html',
  styles: [],
})

export class AlertBoxComponent implements OnInit, AfterViewInit {
    @Input() learnItem: ILearnItem;
    @Input() testItem: ITestItem;
    @Input() validAnswer: boolean;
    @Input() answerSubmitted: boolean;

    constructor() { }
    ngOnInit() {}
    ngAfterViewInit() {}
}
