import { EndMessageComponent } from './components/end-message/end-message.component';
import { CanvasCompoundComponent } from './components/canvas-compound/canvas-compound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';
import { CanvasInteractionComponent } from './components/canvas-interaction/canvas-interaction.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { MyPercentPipe } from './pipes/percent.pipe';
import { PushNotificationComponent } from './components/push-notification/push-notification.component';
import { SimpleNotificationsModule, PushNotificationsModule } from 'angular2-notifications';


@NgModule({
  imports: [ CommonModule, SimpleNotificationsModule, PushNotificationsModule, FormsModule, BrowserAnimationsModule, ReactiveFormsModule ],
  declarations: [
    CapitalizePipe,
    TrimPipe,
    MyPercentPipe,
    CanvasCompoundComponent,
    CanvasInteractionComponent,
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
    CanvasCompoundComponent,
    CanvasInteractionComponent,
    EndMessageComponent,
    AlertBoxComponent,
    SimpleNotificationsModule,
    PushNotificationsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
})
export class SharedModule { }
