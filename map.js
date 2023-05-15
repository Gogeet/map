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

//Structure: [x, y, type, Planet, System, Sector, link to WookCanon, Name to show]
var pointsOfInterest = [
  [779, 690, , , , , , , "Galactic Centre"],
  [754, 592, "Planet", "Coruscant", "Coruscant", "Corusca", "Republic", "https://starwars.fandom.com/wiki/Coruscant", "Coruscant", true],
  [1175, 352, "Planet", "Auratera", "Auratera", "Vorzyd", "Disputed", "https://starwars.fandom.com/wiki/Auratera", "Auratera", true],
  [1230, 375, "Planet", "Ossus", "Adega", "Auril", "Disputed", "https://starwars.fandom.com/wiki/Ossus", "Ossus", true],
  [1175, 276, "Planet", "Korriban", "Horuset", "Esstran", "Empire", "https://starwars.fandom.com/wiki/Korriban", "Korriban", true],
  [1172, 240, "Planet", "Ziost", "Ziost", "Esstran", "Empire", "https://starwars.fandom.com/wiki/Ziost", "Ziost", true],
  [1067, 320, "Moon", "Yavin IV", "Yavin", "Gordian", , "https://starwars.fandom.com/wiki/Yavin_4", "Yavin", true],
  [1196, 262, "Planet", "Dromund Kaas", "Dromund", "Esstran", "Empire", "https://starwars.fandom.com/wiki/Dromund_Kaas", "Dromund Kaas", true],
  [1200, 261, "Planet", "Dromund Fels", "Dromund", "Esstran", "Empire", "https://starwars.fandom.com/wiki/Dromund_Fels", "Dromund Fels", false],
  [969, 364, "Planet", "Dathomir", "Dathomir", "Quelli", "Independent", "https://starwars.fandom.com/wiki/Dathomir", "Dathomir", true],
  [1188, 231, "Planet", "Upekzar", "Upekzar", "Esstran", "Empire", "https://starwars.fandom.com/wiki/Upekzar", "Upekzar", false],
  [1234, 734, "Planet", "Nal Hutta", "Y'Toub", "Hutt Space", "Hutt Space", "https://starwars.fandom.com/wiki/Nal_Hutta", "Hutta", true],
  [1236, 736, "Moon", "Nar Shaddaa", "Y'Toub", "Hutt Space", "Hutt Space", "https://starwars.fandom.com/wiki/Nar_Shaddaa", "Nar Shaddaa", true],
  [1033, 606, "Planet", "Umbara", "Umbara", "Ghost Nebula", "Independent", "https://starwars.fandom.com/wiki/Umbara", "Umbara", true],
  [843, 597, "Planet", "Alderaan", "Alderaan", "Alderaan", "Republic", "https://starwars.fandom.com/wiki/Alderaan", "Alderaan", true],
  [754, 646, "Planet", "Tython", "Tython", "Sector 5", "Republic", "https://starwars.fandom.com/wiki/Tython", "Tython", true],
  [1008, 581, "Planet", "Onderon", "Japrael", "Japrael", "Disputed", "https://starwars.fandom.com/wiki/Onderon", "Onderon", true],
  [883, 633, "Planet", "Balmorra", "Balmorra", , "Republic", "https://starwars.fandom.com/wiki/Balmorra", "Balmorra", true],
  [861, 720, "Planet", "Corellia", "Corellia", "Corellian", "Republic", "https://starwars.fandom.com/wiki/Corellia", "Corellia", true],
  [1113, 524, "Space station", "Mek-Sha", , , "Independent", "https://starwars.fandom.com/wiki/Mek-Sha", "Mek-Sha", false],
  [901, 985, "Planet", "M'haeli", "Plynn", "Majoor", "Republic", "https://starwars.fandom.com/wiki/M%27haeli", "M'haeli", true],
  [1263, 330, "Planet", "Voss", "Voss", "Allied Tion", "Independent", "https://starwars.fandom.com/wiki/Voss", "Voss", false],
  [1078, 585, "Planet", "Kashyyyk", "Kashyyyk", "Mytaranor", "Republic", "https://starwars.fandom.com/wiki/Kashyyyk", "Kashyyyk", true],
  [1081, 583, "Planet", "Trandosha", "Kashyyyk", "Mytaranor", "Republic", "https://starwars.fandom.com/wiki/Trandosha", "Trandosha", true],
  [1080, 584, "Moon", "Wasskah", "Kashyyyk", "Mytaranor", "Republic", "https://starwars.fandom.com/wiki/Wasskah", "Wasskah", true],
  [753, 208, "Planet", "Dantooine", "Dantooine", "Raioballo", "Independent", "https://starwars.fandom.com/wiki/Dantooine", "Dantooine", true],
  [1188, 1055, "Planet", "Tatooine", "Tatoo", "Arkanis", "Independent", "https://starwars.fandom.com/wiki/Tatooine", "Tatooine", true],
  [995, 639, "Planet", "Zeltros", "Zel", , "Republic", "https://starwars.fandom.com/wiki/Zeltros", "Zeltros", true],
  [1003, 407, "Planet", "Mandalore", "Mandalore", "Mandalore", "Independent", "https://starwars.fandom.com/wiki/Mandalore", "Mandalore", true],
  [939, 395, "Planet", "Taris", "Taris", "Ojoster", "Empire", "https://starwars.fandom.com/wiki/Zeltros", "Taris", true]
];

var structure = ["Body: ", "Name: ", "System: ", "Sector: ", "Allegiance: "];

for (var point of pointsOfInterest) {
  createMarker(point);
}
