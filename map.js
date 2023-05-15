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
var southWest = map.unproject([0, imageHeight]);
var northEast = map.unproject([imageWidth, 0]);
var imageBounds = L.latLngBounds(southWest, northEast);

// Add the image overlay
L.imageOverlay(imageUrl, imageBounds).addTo(map);

// Set the map center and zoom level
map.setView([-800, 800], 0);


function pixelToLatLng(pixelCoordinates) {
    var zoom = map.getZoom();
    return map.unproject(pixelCoordinates, zoom);
  }
  
  // Example usage: Add a marker at pixel coordinates (800, 800)
  var pixelCoordinates = [800, 800];
  var latLng = pixelToLatLng(pixelCoordinates);
  L.marker(latLng).addTo(map);