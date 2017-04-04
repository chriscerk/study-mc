import { SharedModule } from './../shared/shared.module';
import { AboutInfoComponent } from './about-info.component';
import { AboutHelpComponent } from './about-help.component';
import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { about_routing } from './about.routing';

@NgModule({
  imports:      [ CommonModule, about_routing, SharedModule ],
  declarations: [ AboutComponent, AboutHelpComponent, AboutInfoComponent ],
  exports: [AboutComponent, AboutHelpComponent, AboutInfoComponent ]
})
export class AboutModule { }
