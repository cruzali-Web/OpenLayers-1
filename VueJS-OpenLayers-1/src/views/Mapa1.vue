<template>
  <div ref="mapContainer" class="map"></div>
</template>

<script>
import { Style, Circle, Fill, Stroke } from 'ol/style';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';

export default {
  name: 'Mapa1',
  mounted() {
    // Fuente de datos GeoJSON
    const vectorSource = new VectorSource({
      url: '/pue.geojson', // Ruta del archivo GeoJSON
      format: new GeoJSON(),
    });

    // Capa vectorial
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({ color: 'black', width: 1 }),
        }),
      }),
    });

    // Crear mapa
    new Map({
      target: this.$refs.mapContainer,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: [-10930616.52459032, 2158887.4599897848], // Coordenadas centradas (en EPSG:3857)
        zoom: 11,
      }),
    });
  },
};
</script>

<style>
.map {
  width: 100vw;
  height: 100vh;
}
</style>
