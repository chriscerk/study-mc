import { Component, Input } from '@angular/core';

@Component({ 
  selector: 'end-message',
  templateUrl: 'end-message.component.html'
})
export class EndMessageComponent {
    @Input() topicName: string;
    @Input() incorrectAnswers: number;

    constructor() { }
}
