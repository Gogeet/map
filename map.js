var imageUrl = 'map_og.png';
var imageWidth = 1576;
var imageHeight = 1415;

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

map.setView([-imageWidth/2, imageHeight/2], 0);


function pixelToLatLng(pixelCoordinates) {
    var zoom = map.getZoom();
    return map.unproject(pixelCoordinates, zoom);
  }

//Structure: [x, y, type, Planet, System, Sector, link to WookCanon, Name to show]
var pointsOfInterest = [
    [779, 690, , , , , , , "Galactic Centre"],
    [754, 592, "Planet", "Coruscant", "Coruscant", "Corusca", "Republic", "https://starwars.fandom.com/wiki/Coruscant", "Coruscant"],
    [1175, 352, "Planet", "Auratera", "Auratera", "Vorzyd", "Disputed", "https://starwars.fandom.com/wiki/Auratera", "Auratera",],
    [1230, 375, "Planet", "Ossus", "Adega", "Auril", "Disputed", "https://starwars.fandom.com/wiki/Ossus", "Ossus"],
    [1175, 276, "Planet", "Korriban", "Horuset", "Esstran", "Empire", "https://starwars.fandom.com/wiki/Korriban", "Korriban"],
    [1172, 240, "Planet", "Ziost", "Ziost", "Esstran", "Empire", "https://starwars.fandom.com/wiki/Ziost", "Ziost"],
    [,,,,,,,],
]

var structure = ["Body: ", "Name: ", "System: ", "Sector: ", "Allegiance: "];

for(let i = 0; i < pointsOfInterest.length; i++) {
    var pixelCoordinates = [pointsOfInterest[i][0], pointsOfInterest[i][1]];
    var latLng = pixelToLatLng(pixelCoordinates);

    var marker = L.marker(latLng);

    var text = "<b>" + pointsOfInterest[i][8] + "</b>";

    marker.bindTooltip(text);

    for(let j = 2; j < pointsOfInterest[i].length-2; j++) {
        if(pointsOfInterest[i][j] !== undefined) {
            text += "<br />" + structure[j-2] + pointsOfInterest[i][j];
        }
    }

    if(pointsOfInterest[i][7] !== undefined) {
        text += "<br /> <a href=\"" + pointsOfInterest[i][7] + "\\Legends\" target=\"_blank\">Wook Legends</a>";
        text += "<br /> <a href=\"" + pointsOfInterest[i][7] + "\" target=\"_blank\">Wook Canon</a>";
    }

    marker.bindPopup(text);

    marker.addTo(map);

}