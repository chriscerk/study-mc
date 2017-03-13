var fabricProcessor = (function () {
  var my = {},
      canvases = [],
      contexts = [],
      fabricCanvases = [],
      myObjs = [],
      canvasObjs = [],
      canvasMovements = [];

  function setCanvasSize(canvasId, canvasSize) {
    contexts[canvasId].canvas.width = canvasSize.width;
    contexts[canvasId].canvas.height = canvasSize.height;
  };

  function applyObjProps(object, img) {

    if(object.hasOwnProperty("opacity")) {
      img.setOpacity(object.opacity)
    }

    if(object.hasOwnProperty("startAngle")) {
      img.set({angle: object.startAngle});
    }

    if(object.hasOwnProperty("movementLocked")) {
      if(object.movementLocked == "x") {
        img.set({lockMovementX: true});
      }
      else if(object.movementLocked == "y") {
        img.set({lockMovementY: true});
      }
      else {
        img.set({lockMovementX: true, lockMovementY: true});
      }
    }

    if(object.hasOwnProperty("controlLocked")) {
      if(object.controlLocked == "scaling") {
        img.setControlsVisibility({
            mt: false, 
            mb: false, 
            ml: false, 
            mr: false, 
        });
      }
      else if(object.controlLocked == "rotating") {
        img.setControlsVisibility({
            mtr: false
        });
      }
      else if(object.controlLocked == "all") {
        img.setControlsVisibility({
            mt: false,
            mb: false, 
            ml: false, 
            mr: false, 
            bl: false,
            br: false,
            tl: false,
            tr: false,
            mtr: false
        });
      }
    }
  }

  my.moduleName = "FabricProcessor";

  my.initCanvas = function(canvasId, options) {
      canvases[canvasId] = document.getElementById(canvasId);
      contexts[canvasId] = canvases[canvasId].getContext('2d');

      fabricCanvases[canvasId] = new fabric.Canvas(canvasId, {
        selectionColor: 'rgba(105, 255, 105, 0.32)',
        selectionLineWidth: 2
      });

      for(var i in options) {
        let option = options[i];
        if(option.hasOwnProperty("canvasSize")) {
          fabricCanvases[canvasId].setDimensions(option.canvasSize)
        }

        if(option.hasOwnProperty("canvasSize")) {
          fabricCanvases[canvasId].setDimensions(option.canvasSize)
        }
      }

        function disableScroll() {
          fabricCanvases[canvasId].allowTouchScrolling = false;
        };

        function enableScroll() {
          fabricCanvases[canvasId].allowTouchScrolling = true;
        };

      fabricCanvases[canvasId].on({
        'object:moving': onMove,
        'object:scaling': onScale,
        'object:rotating': onRotate,
        'object:modified': onModify,
        'mouse:up': onMouseUp
      });

      function onModify(obj) { }

      function onMouseUp() {
        enableScroll();
      }

      function onScale(options) {
        fadeIfOverlap(options);
        disableScroll();
      }

      function onRotate(options) {
        fadeIfOverlap(options);
        disableScroll();
      }

      function onMove(options) {
        fadeIfOverlap(options);
        disableScroll();
      }

      function fadeIfOverlap(options) {
        options.target.setCoords();
        fabricCanvases[canvasId].forEachObject(function(obj) {
          if (obj === options.target) return;
          obj.setOpacity(options.target.intersectsWithObject(obj) ? 0.5 : 1);
        });
      }
  }

  my.applyObjects = function(canvasId, objects) {
    for(var i in objects) {
      let object = objects[i];

      myObjs[canvasId] = []
      canvasObjs[canvasId] = []

      fabric.Image.fromURL(object.image, function(img) {

        img.scale(0.5).set({
          left: 0,
          top: 0,
          lockUniScaling: true,
          originX: 'center',
          originY: 'center'
        });
        applyObjProps(object, img);

        var text = new fabric.Text(object.text.value, {
          left: object.text.left,
          top: object.text.top,
          fontSize: object.text.fontSize,
          shadow: 'rgba(0,0,0,0.3) 1px 1px 1px',
          originX: 'center',
          originY: 'center'
        });
        var group = new fabric.Group([ img, text ], {
          left: object.startX,
          top: object.startY,
          accessKey: object.image,
          hasControls: false
        });

        fabricCanvases[canvasId].add(group);
        myObjs[canvasId].push(group);
        canvasObjs[canvasId].push(group);

        let objectName = object.image + canvasId
        canvasMovements[objectName] = object.movement;
      });
    }
  };

  function moveObjectAnimation(canvasId, object, movement) {
     if(movement.destination.hasOwnProperty("x")) {
        object.animate('left', movement.destination.x, {
          duration: 1000,
          onChange: fabricCanvases[canvasId].renderAll.bind(fabricCanvases[canvasId]),
          onComplete: function() {},
          easing: fabric.util.ease.easeInOutQuad
        });
     }

     if(movement.destination.hasOwnProperty("y")) {
        object.animate('top', movement.destination.y, {
          duration: 1000,
          onChange: fabricCanvases[canvasId].renderAll.bind(fabricCanvases[canvasId]),
          onComplete: function() {},
          easing: fabric.util.ease.easeInOutQuad
        });
     }
  };

  my.fireAllAnimations = function(canvasId) {
    //let canvasId = getCanvasId(btnId);
    let objects = myObjs[canvasId];

    fabricCanvases[canvasId].forEachObject(function(obj) {
      let movement = canvasMovements[obj.accessKey + canvasId];
      moveObjectAnimation(canvasId, obj, movement);
    });
  };

  function getCanvasId(buttonId) {
    var pattern = /^(\w*)(-button)$/;
    canvasId = pattern.exec(buttonId)[1];
    return canvasId;
  }

  return my;
}());
