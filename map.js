var imageUrl = 'map.png',
    imageBounds = [[-400, -400], [400, 400]];


var map = L.map('map').setView([0, 0], 1);

L.imageOverlay(imageUrl, imageBounds).addTo(map);

var marker = L.marker([0, 0]).addTo(map);
marker.bindPopup('this is a pop-up!').openPopup();