declare var hotspotsModule:any;
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ITopic, ILearnItem, InteractiveMolecule } from '../shared/interfaces';

@Component({ 
  selector: 'compound-Canvas',
  template: 
  `
  <button class="btn btn-default" (click)="showCompoundAreas()" type="button" id="{{canvasId}}-button">Display Areas</button>
  <canvas id="{{canvasId}}">
  </canvas>`,
  styles: [`
    button {
      float: left;
    }
  `],
})
export class CompoundCanvasComponent implements OnInit, AfterViewInit {
    @Input() learnItem: InteractiveMolecule;
    @Input() topic: ITopic;
    @Input() i: number;
    canvasId: string;
  
    constructor() { }

    ngOnInit() {
      this.canvasId = this.topic.name + "-Canvas-" + this.i;
    }

    ngAfterViewInit() {
        let fullImgPath = "/studymc-media/compounds/" + this.topic.name + "/" + this.learnItem.imagePath;

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
