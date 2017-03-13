import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { training_routing } from './training.routing';

@NgModule({
  imports:      [ CommonModule, training_routing ],
  declarations: [ TrainingComponent ],
  exports: [ TrainingComponent ]
})
export class TrainingModule { }