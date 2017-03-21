//Globals
var canvases = [];
var contexts = [];
var imageObjs = [];
var hotspots = [];

var hotspotsModule = {
    initCanvas: function(canvasId) {
      canvases[canvasId] = document.getElementById(canvasId);
      contexts[canvasId] = canvases[canvasId].getContext('2d');
      imageObjs[canvasId] = new Image();
    },

    initCanvasWithDims: function(canvasId, width, height) {
      hotspotsModule.initCanvas(canvasId);
      setCanvasSize(canvasId, width, height);
      refreshCanvas(canvasId, padding);
    },

    initCanvasImg: function(canvasId, image, padding, desiredImgWidth, myHotspots) {
      hotspotsModule.initCanvas(canvasId);

      imageObjs[canvasId].onload = function() {
          var imgWidth = this.width;
          var imgHeight = this.height;

          var calcImgHeight = getCalculatedHeight(imgWidth, imgHeight, desiredImgWidth);

          var canvasHeight = padding*2 + calcImgHeight;
          var canvasWidth = padding*2 + desiredImgWidth;

          setCanvasSize(canvasId, canvasWidth, canvasHeight);
          refreshCanvas(canvasId, padding);
      };
      imageObjs[canvasId].src = image;
      hotspots[canvasId] = myHotspots;

      hotspotsModule.initHotSpotEvents(canvasId);

      canvases[canvasId].onmousemove=function(e) {
        renderHotspots(canvasId, e, padding);
      };
    },

    displayAllHotspots: function(canvasId, color) {
      hotspots[canvasId].forEach(function(hs) {
          drawHotspot(canvasId, hs.x, hs.y, hs.size, color);

      });
    },

    displayAllHotspotTexts: function(canvasId, color) {
      hotspots[canvasId].forEach(function(hs) {
          displayText(canvasId, hs.name, hs.x, hs.y, color);
      });
    },

    initHotSpotEvents: function(canvasId) {

      events = ["mouseover", "click", "mouseout"];  

      events.forEach(function(e) {
        canvases[canvasId].addEventListener(e, function(event) {
          var mousePosition = getMousePosition(contexts[canvasId].canvas, event);
          var x = mousePosition.x;
          var y = mousePosition.y;
           console.log(e + ' @ (' + x + ',' + y + ')');   

          hotspots[canvasId].forEach(function(hs) {
            if (y > hs.y - hs.size && 
                y < hs.y + hs.size && 
                x > hs.x - hs.size && 
                x < hs.x + hs.size) {
              console.log(e + ' on hotspot:' + hs.name + ' @ (' + x + ',' + y + ')');       
            }
          });
        }, false);
      });
  }
};

function getCalculatedHeight(imgWidth, imgHeight, desiredImgWidth) {
    var yxRatio = imgHeight / imgWidth;
    var myImgHeight = desiredImgWidth * yxRatio;
    return myImgHeight;
}

function setCanvasSize(canvasId, width, height) {
    contexts[canvasId].canvas.width = width;
    contexts[canvasId].canvas.height = height;
}

function renderHotspots(canvasId, e, padding) {
    var mousePosition = getMousePosition(contexts[canvasId].canvas, e);
    var x = mousePosition.x;
    var y = mousePosition.y;
    var isHotspot = false;

    hotspots[canvasId].forEach(function(hs) {
      if (y > hs.y - hs.size && 
          y < hs.y + hs.size && 
          x > hs.x - hs.size && 
          x < hs.x + hs.size) {
        isHotspot = true;
        updateHotspot(canvasId, hs, padding);
        displayText(canvasId, hs.name, x, y, hs.color);
        displayDialogue(canvasId, hs);
      }
    });
}

function displayDialogue(canvasId, hs){
    displayText(canvasId, hs.text, 0, 100);
}

 function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

function displayText(canvasId, text, x, y, color){
    var words = text.split(' ');
    var line = '';
    var maxWidth = contexts[canvasId].canvas.width;

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = contexts[canvasId].measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            contexts[canvasId].fillText(line, x, y);
            line = words[n] + ' ';
            y += 25;
        }
        else {
            line = testLine;
        }
    }

    contexts[canvasId].font = "14pt Georgia";
    contexts[canvasId].fillText(line, x, y);
    contexts[canvasId].fillStyle = color;
}

function refreshCanvas(canvasId, padding) {
  contexts[canvasId].clearRect(0, 0, contexts[canvasId].canvas.width, contexts[canvasId].canvas.height);
  contexts[canvasId].drawImage(
    imageObjs[canvasId], 
    padding, 
    padding, 
    contexts[canvasId].canvas.width - padding*2, 
    contexts[canvasId].canvas.height - padding*2
    );
}

function drawHotspot(canvasId, x, y, size, color) {
  contexts[canvasId].beginPath();
  contexts[canvasId].arc(x, y , size, 0, 2*Math.PI);
  contexts[canvasId].strokeStyle = color;
  contexts[canvasId].lineWidth = 1;
  contexts[canvasId].stroke();
}

function updateHotspot(canvasId, hs, padding) {
  refreshCanvas(canvasId, padding);
  drawHotspot(canvasId, hs.x, hs.y, hs.size, hs.color);
}
