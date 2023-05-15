const customIcon = L.icon({
  iconUrl: 'icon.png',
  iconSize: [15, 15],
  iconAnchor: [6, 15],
  popupAnchor: [0, -4],
  tooltipAnchor: [5, -10]
});

const markers = [];
let markerIndex = 0;

const imageUrl = 'map_og.png';
const imageWidth = 1576;
const imageHeight = 1415;

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -Infinity,
  maxZoom: Infinity,
  attributionControl: false
});

function pixelToLatLng(pixelCoordinates) {
  const zoom = map.getZoom();
  return map.unproject(pixelCoordinates, zoom);
}

const southWest = map.unproject([0, imageHeight]);
const northEast = map.unproject([imageWidth, 0]);
const imageBounds = L.latLngBounds(southWest, northEast);

L.imageOverlay(imageUrl, imageBounds).addTo(map);

map.setView([-imageWidth / 2, imageHeight / 2], 0);

import pointsOfInterest from './locations.mjs';

const structure = ['Body: ', 'Name: ', 'System: ', 'Sector: ', 'Allegiance: '];

function createMarker(point) {
  const [x, y, , , , , , , name] = point;
  const pixelCoordinates = [x, y];
  const latLng = pixelToLatLng(pixelCoordinates);
  const marker = L.marker(latLng, {
    icon: customIcon
  });

  const link = document.createElement('a');
  link.href = '#';
  link.textContent = name;
  link.setAttribute('index', markerIndex);
  link.classList.add('planet-link');
  const markerLinks = document.getElementById('marker-links');
  markerLinks.appendChild(link);

  const span = document.createElement('span');
  span.textContent = '  |  ';
  span.classList.add('planet-link');
  markerLinks.appendChild(span);

  marker.bindTooltip('<b>' + name + '</b>');

  let text = '<b>' + name + '</b>';
  for (let i = 2; i < point.length - 3; i++) {
    if (point[i]) {
      text += '<br />' + structure[i - 2] + point[i];
    }
  }

  if (point[7]) {
    text += '<br />' + (point[9] ? `<a href="${point[7]}\\Legends" target="_blank">Wook Legends</a>` : `<a href="${point[7]}" target="_blank">Wook Legends</a>`);
    if (point[9]) {
      text += `<br /><a href="${point[7]}" target="_blank">Wook Canon</a>`;
    }
  }

  marker.bindPopup(text);
  marker.addTo(map);

  marker._id = markerIndex;
  marker.on('click', function() {
    const markerId = this._id;
  });
  markers.push(marker);

  markerIndex++;
}

for (const point of pointsOfInterest) {
  createMarker(point);
}

const links = document.querySelectorAll('#marker-links a');
links.forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const markerIndex = parseInt(this.getAttribute('index'), 10);
    markers[markerIndex].unbindTooltip();

    const markerClicked = markers[markerIndex];
    markerClicked.fire('click');

    setTimeout(function() {
      markers[markerIndex].bindTooltip();
    }, 1000);
  });
});
