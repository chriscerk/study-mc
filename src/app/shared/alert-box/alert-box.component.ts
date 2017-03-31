import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ITopic, ILearnItem, InteractiveMolecule, ITestItem } from '../../shared/interfaces';

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
