var imageUrl = 'map.png';

var viewer = OpenSeadragon({
  id: 'map',
  prefixUrl: 'openseadragon/images/',
  tileSources: imageUrl,
  defaultZoomLevel: 0,
  minZoomLevel: 0,
  maxZoomLevel: 10,
});
