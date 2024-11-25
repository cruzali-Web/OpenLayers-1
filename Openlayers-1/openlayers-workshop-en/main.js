import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {Map, View} from 'ol';

new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [-10930312.622380456, 2160568.9794882913], //fromLonLat([0, 0]),
    zoom: 15,
  }),
});
