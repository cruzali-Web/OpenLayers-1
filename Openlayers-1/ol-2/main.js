const map = new ol.Map({
  target: 'map-main',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    })
  ],
  view: new ol.View({
    center: [0, 0],
    zoom: 1,
  })
}
);