import { Component, Input } from '@angular/core';

@Component({ 
  selector: 'end-message',
  template: 
  `
  <div class="alert alert-success" role="alert">
    <p>Congrats! You finished this {{topicName}} module</p>
    <h2>{{incorrectAnswers}}</h2>
    <p>Incorrect Answer(s)</p>
    <a href="#" class="alert-link">Head to Homepage</a>
  </div>
`,
  styles: [],
})
export class EndMessageComponent {
    @Input() topicName: string;
    @Input() incorrectAnswers: number;

    constructor() { }
}