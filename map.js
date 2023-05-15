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

  marker.bindTooltip(text);

  for (let i = 2; i < point.length - 3; i++) {
    if (point[i]) {
      text += "<br />" + structure[i - 2] + point[i];
    }
  }

  if (point[7]) {
    if(point[9]) {
      text += "<br /> <a href=\"" + point[7] + "\\Legends\" target=\"_blank\">Wook Legends</a>";
      text += "<br /> <a href=\"" + point[7] + "\" target=\"_blank\">Wook Canon</a>";
    } else {
    text += "<br /> <a href=\"" + point[7] + "\" target=\"_blank\">Wook Legends</a>";
    }
  }

  marker.bindPopup(text);
  marker.addTo(map);
}

import pointsOfInterest from "./locations.mjs";

var structure = ["Body: ", "Name: ", "System: ", "Sector: ", "Allegiance: "];

for (var point of pointsOfInterest) {
  createMarker(point);
}
