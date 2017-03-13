//Example Image
var image = "benzodiazepine.PNG";
var firstOverlay = "d-alanine-overlay.PNG";
var secondOverlay = "d-cycloserine-overlay.PNG";

var customAnimations = [
      {
            title: "Test",
            helpText: "",
            options: [
                  {
                        canvasSize: { width: 400, height: 600 }
                  }
            ],
            objects: [
                  { 
                        image: firstOverlay, 
                        startY: 10, 
                        startX: 10, 
                        opacity: .5, 
                        movementLocked: "x",
                        controlLocked: "all",
                        text: {
                              value: "D Alanine",
                              left: 0,
                              top: -100,
                              fontSize: 30
                        },
                        movement:
                              {
                                    destination: { x: 150, y:157 },
                                    on: ""
                              }
                  },
                  { 
                        image: 
                        secondOverlay, 
                        startY: 400, 
                        startX: 20, 
                        opacity: .5, 
                        movementLocked: "x",
                        controlLocked: "all",
                        text: {
                              value: "D Cycloserine",
                              left: 0,
                              top: 100,
                              fontSize: 30
                        },
                        movement:
                              {
                                    destination: { x: 160, y:200 },
                                    on: ""
                              }
                  }
            ]
      }
]

var currentCanvasId = "myProcessedCanvas";
var currentAnimation = customAnimations[0];

fabricProcessor.initCanvas(currentCanvasId, currentAnimation.options);
fabricProcessor.applyObjects(currentCanvasId, currentAnimation.objects);

function getCanvasId(buttonId) {
	var pattern = /^(\w*)(-button)$/;
	canvasId = pattern.exec(buttonId)[1];
	return canvasId;
}
