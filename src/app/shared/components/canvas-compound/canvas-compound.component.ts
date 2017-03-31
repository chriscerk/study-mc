import { ITopic } from './../../models/topic';
import { InteractiveMolecule } from './../../models/learn';
declare var hotspotsModule: any;
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({ 
  selector: 'canvas-compound',
  templateUrl: 'canvas-compound.component.html',
  styleUrls: ['canvas-compound.component.css'],
})
export class CanvasCompoundComponent implements OnInit, AfterViewInit {
    @Input() learnItem: InteractiveMolecule;
    @Input() topic: ITopic;
    @Input() i: number;
    canvasId: string;
  
    constructor() { }

    ngOnInit() {
      this.canvasId = this.topic.name + "-Canvas-" + this.i;
    }

    ngAfterViewInit() {
        let fullImgPath = 'assets/media/compounds/' + this.topic.name + "/" + this.learnItem.imagePath;

        if(this.learnItem.imgWidth){
          var imgWidth = this.learnItem.imgWidth;
        }
        else {
          var imgWidth = 200;
        }

        if(this.learnItem.imgPadding){
          var imgPadding = this.learnItem.imgPadding;
        }
        else {
          var imgPadding = 150;
        }

        hotspotsModule.initCanvasImg(this.canvasId, fullImgPath, imgPadding, imgWidth, this.learnItem.compoundHotspots);
    }

    showCompoundAreas() {
      hotspotsModule.displayAllHotspots(this.canvasId, "black");
  }
}