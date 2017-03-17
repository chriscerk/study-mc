import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { about_routing } from './about.routing';

@NgModule({
  imports:      [ CommonModule, about_routing ],
  declarations: [ AboutComponent ],
  exports: [AboutComponent ]
})
export class AboutModule { }
