import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertBoxComponent } from './alert-box/alert-box.component';
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
import { PushNotificationComponent } from './push-notification/push-notification.component';
import {SimpleNotificationsModule, PushNotificationsModule} from 'angular2-notifications';

@NgModule({
  imports: [ CommonModule, SimpleNotificationsModule, PushNotificationsModule, FormsModule, BrowserAnimationsModule ],
  declarations: [
    CapitalizePipe,
    TrimPipe,
    MyPercentPipe,
    CompoundCanvasComponent,
    CanvasAnimationComponent,
    EndMessageComponent,
    AlertBoxComponent,
    PushNotificationComponent
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
    AlertBoxComponent,
    SimpleNotificationsModule,
    PushNotificationsModule,
    BrowserAnimationsModule
  ],
})
export class SharedModule { }
