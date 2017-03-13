import { AlertBoxComponent } from './alertBox.component';
import { EndMessageComponent } from './endMessage.component';
import { CanvasAnimationComponent } from './canvasAnimation.component';
import { CompoundCanvasComponent } from './compoundCanvas.component';

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { MyPercentPipe } from './pipes/percent.pipe';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    CapitalizePipe,
    TrimPipe,
    MyPercentPipe,
    CompoundCanvasComponent,
    CanvasAnimationComponent,
    EndMessageComponent,
    AlertBoxComponent
    ],
  exports: [
    CapitalizePipe,
    TrimPipe,
    MyPercentPipe,
    CommonModule,
    FormsModule,
    HttpModule,
    CompoundCanvasComponent,
    CanvasAnimationComponent,
    EndMessageComponent,
    AlertBoxComponent
  ],
})
export class SharedModule { }
