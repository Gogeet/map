var imageUrl = 'map.png';
var imageWidth = 1600;
var imageHeight = 1600;

var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -Infinity,
  maxZoom: Infinity
});

// Convert pixel coordinates to geographic coordinates
function pixelToLatLng(pixelCoordinates) {
  var zoom = map.getZoom();
  return map.unproject(pixelCoordinates, zoom);
}

// Set the initial view based on the image dimensions
var southWest = map.unproject([0, imageHeight], map.getMaxZoom());
var northEast = map.unproject([imageWidth, 0], map.getMaxZoom());
var imageBounds = L.latLngBounds(southWest, northEast);

// Add the image overlay
L.imageOverlay(imageUrl, imageBounds).addTo(map);

// Set the map center and zoom level
map.setView([0, 0], 1);
