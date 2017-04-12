import { ITopic } from './../../models/topic';
import { MovementAnimation, AnimationOptions } from './../../models/learn';
declare var fabricProcessor:any;
import { UrlResolver } from '@angular/compiler';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';



@Component({ 
  selector: 'canvas-interaction',
  templateUrl: 'canvas-interaction.component.html',
  styleUrls: ['canvas-interaction.component.css']
})

export class CanvasInteractionComponent implements OnInit, AfterViewInit {
    @Input() currentAnimation: MovementAnimation;
    @Input() i: number;
    canvasId: string;
    options: AnimationOptions;

    constructor() { }

    ngOnInit() {
      this.canvasId = this.currentAnimation.topicName + '-Canvas-' + this.i;

      let path = 'assets/media/compounds/' + this.currentAnimation.topicName + '/';
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
