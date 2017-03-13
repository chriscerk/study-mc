import { Component } from '@angular/core';

@Component({
  selector: 'training',
  template: `<h1>Training</h1> <h2>{{info}}</h2>`
})
export class TrainingComponent { info = 'This is a Training Component for new hires to learn Angular.'; }