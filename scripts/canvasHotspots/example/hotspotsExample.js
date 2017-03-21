var firstHotspots = [
    {
        name: 'Ring A',
        y: 263,
        x: 292,
        size: 40,
        color: "red",
        text: "Pi-Pi stacking with BZR"
  },
  {
        name: 'Ring B',
        y: 280,
        x: 203,
        size: 30,
        color: "green",
        text: "H-bond acceptor (O, N, S) or N-heterocycle required. 1,2 annelation (N-heterocycle) increases affinity for BZR"
  },
  {
        name: 'N1',
        y: 209,
        x: 266,
        size: 30,
        color: "blue",
        text: "EWG increases activity"
  },
  {
        name: 'C7',
        y: 317,
        x: 154,
        size: 30,
        color: "orange",
        text: "methyl group preferred; bulky group decreases activity because it prevents binding to BZR"
  },
  {
        name: 'Ring C',
        y: 411,
        x: 288,
        size: 30,
        color: "deeppink",
        text: "Hydrophobic interaction with BZR"
  },
  {
        name: 'C2',
        y: 375,
        x: 340,
        size: 25,
        color: "purple",
        text: "F or Cl substitution reduces aromatic hydroxylation and improves half-life"
  },
  {
        name: 'C4',
        y: 466,
        x: 288,
        size: 25,
        color: "darkgoldenrod",
        text: "steric repulsion occurs with para substituent"
  }
];

var secondHotspots = [
    {
        name: 'Big Hotspot',
        y: 176,
        x: 219,
        size: 100,
        color: "tomato",
        text: ""
  },
  {
        name: 'Little Hotspot',
        y: 270,
        x: 100,
        size: 30,
        color: "teal",
        text: ""
  },
];

var canvasIdToHotspots = [];

canvasIdToHotspots["myCanvas"] = firstHotspots;
canvasIdToHotspots["myOtherCanvas"] = secondHotspots;


//Example Image
var image = "benzodiazepine.PNG";

hotspotsModule.initCanvasImg("myCanvas", image, 150, 200, firstHotspots);

hotspotsModule.initCanvasImg("myOtherCanvas", image, 10, 300, secondHotspots);


function showCompoundAreas(buttonId) {
	var pattern = /^(\w*)(-button)$/;
	canvasId = pattern.exec(buttonId)[1];
	hotspotsModule.displayAllHotspots(canvasId, "black", canvasIdToHotspots[canvasId]);
}
