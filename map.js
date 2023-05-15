var imageUrl = 'map_og.png';
var imageWidth = 1576;
var imageHeight = 1415;

var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -Infinity,
  maxZoom: Infinity,
  attributionControl: false
});

function pixelToLatLng(pixelCoordinates) {
  var zoom = map.getZoom();
  return map.unproject(pixelCoordinates, zoom);
}

var southWest = map.unproject([0, imageHeight]);
var northEast = map.unproject([imageWidth, 0]);
var imageBounds = L.latLngBounds(southWest, northEast);

L.imageOverlay(imageUrl, imageBounds).addTo(map);

map.setView([-imageWidth / 2, imageHeight / 2], 0);

function createMarker(point) {
  var [x, y, , , , , , , name] = point;
  var pixelCoordinates = [x, y];
  var latLng = pixelToLatLng(pixelCoordinates);
  var marker = L.marker(latLng);
  var text = "<b>" + name + "</b>";

  for (let i = 2; i < point.length - 2; i++) {
    if (point[i]) {
      text += "<br />" + structure[i - 2] + point[i];
    }
  }

  if (point[7]) {
    text += "<br /> <a href=\"" + point[7] + "\\Legends\" target=\"_blank\">Wook Legends</a>";
    text += "<br /> <a href=\"" + point[7] + "\" target=\"_blank\">Wook Canon</a>";
  }

  marker.bindTooltip(text);
  marker.bindPopup(text);
  marker.addTo(map);
}

//Structure: [x, y, type, Planet, System, Sector, link to WookCanon, Name to show]
var pointsOfInterest = [
  [779, 690, , , , , , , "Galactic Centre"],
  [754, 592, "Planet", "Coruscant", "Coruscant", "Corusca", "Republic", "https://starwars.fandom.com/wiki/Coruscant", "Coruscant"],
  [1175, 352, "Planet", "Auratera", "Auratera", "Vorzyd", "Disputed", "https://starwars.fandom.com/wiki/Auratera", "Auratera"],
  [1230, 375, "Planet", "Ossus", "Adega", "Auril", "Disputed", "https://starwars.fandom.com/wiki/Ossus", "Ossus"],
  [1175, 276, "Planet", "Korriban", "Horuset", "Esstran", "Empire", "https://starwars.fandom.com/wiki/Korriban", "Korriban"],
  [1172, 240, "Planet", "Ziost", "Ziost", "Esstran", "Empire", "https://starwars.fandom.com/wiki/Ziost", "Ziost"],
  [1067, 320, "Moon", "Yavin IV", "Yavin", "Gordian", , "https://starwars.fandom.com/wiki/Yavin_4", "Yavin"],
];

var structure = ["Body: ", "Name: ", "System: ", "Sector: ", "Allegiance: "];

for (var point of pointsOfInterest) {
  createMarker(point);
}
