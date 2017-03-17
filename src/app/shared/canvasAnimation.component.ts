import { AnimationOptions } from './interfaces';
declare var fabricProcessor:any;
import { UrlResolver } from '@angular/compiler';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ITopic, ILearnItem, MovementAnimation } from '../shared/interfaces';


@Component({ 
  selector: 'canvas-animation',
  template: 
  `
  <button class="btn btn-default" (click)="fireAnimations()" type="button" id="{{canvasId}}-button">Play</button>
  <br>
  <br>
  <canvas id="{{canvasId}}" width="400" height="400" class="lower-canvas">
  </canvas>`,
  styles: [`
    button {
      float: left;
    }

    canvas {
      margin-right: auto;
      margin-left: auto;
    }

    canvas.lower-canvas {
      border: 1px solid rgb(239, 239, 239);
      border-radius: 20px;
    }
  `],
})
export class CanvasAnimationComponent implements OnInit, AfterViewInit {
    @Input() currentAnimation: MovementAnimation;
    @Input() topic: ITopic;
    @Input() i: number;
    canvasId: string;
    options: AnimationOptions;

    constructor() { }

    ngOnInit() {
      this.canvasId = this.topic.name + '-Canvas-' + this.i;

      let path = '/assets/media/compounds/' + this.topic.name + '/';
      this.options = { 'relativeImgPath': path, 'canvasSize': { 'width': 400 , 'height': 600 } }
    }

    ngAfterViewInit() {
        fabricProcessor.initCanvas(this.canvasId, this.options);
        fabricProcessor.applyObjects(this.canvasId, this.currentAnimation.objects);
    }

    fireAnimations() {
      fabricProcessor.fireAllAnimations(this.canvasId);
  }
}