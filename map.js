var imageUrl = 'map.png';
var imageWidth = 1600;
var imageHeight = 1600;

var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -Infinity,
  maxZoom: Infinity
});

function pixelToLatLng(pixelCoordinates) {
  var zoom = map.getZoom();
  return map.unproject(pixelCoordinates, zoom);
}

var southWest = map.unproject([0, imageHeight]);
var northEast = map.unproject([imageWidth, 0]);
var imageBounds = L.latLngBounds(southWest, northEast);

L.imageOverlay(imageUrl, imageBounds).addTo(map);

map.setView([-800, 800], 0);


function pixelToLatLng(pixelCoordinates) {
    var zoom = map.getZoom();
    return map.unproject(pixelCoordinates, zoom);
  }

//Structure: [x, y, type, Planet, System, Sector, link to WookLegends, link to WookCanon, Name to show]
var pointsOfInterest = [
    [800, 800, , , , , , , "Galactic Centre"],
    [767, 670, "Planet", "Coruscant", "Coruscant", "Corusca", "https://starwars.fandom.com/wiki/Coruscant/Legends", "https://starwars.fandom.com/wiki/Coruscant", "Coruscant"]
]

var structure = ["Body: ", "Name: ", "System: ", "Sector: ", "Wook Legends", "Wook Canon"];

for(let i = 0; i < pointsOfInterest.length; i++) {
    var pixelCoordinates = [pointsOfInterest[i][0], pointsOfInterest[i][1]];
    var latLng = pixelToLatLng(pixelCoordinates);

    var marker = L.marker(latLng);

    var text = "<b>" + pointsOfInterest[i][8] + "</b>";

    marker.bindTooltip(text);

    for(let j = 2; j < pointsOfInterest[i].length-3; j++) {
        if(pointsOfInterest[i][j] !== undefined) {
            text += "<br />" + structure[j-2] + pointsOfInterest[i][j];
        }
    }

    for(let j = pointsOfInterest[i].length-3; j < pointsOfInterest[i].length-1; j++) {
        if(pointsOfInterest[i][j] !== undefined) {
            text += "<br /> <a href=\"" + pointsOfInterest[i][j] + "\" target=\"_blank\">" + structure[j-2] + "</a>";
        }
    }

    marker.bindPopup(text);

    marker.addTo(map);

}