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
  name: 'Map',
  mounted() {
    // Fuente para pue.geojson (puntos rojos)
    const pueSource = new VectorSource({
      url: '/pue.geojson', // Ruta del archivo GeoJSON
      format: new GeoJSON(),
    });

    // Capa para pue.geojson
    const pueLayer = new VectorLayer({
      source: pueSource,
      style: new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({ color: 'black', width: 1 }),
        }),
      }),
    });

    // Fuente para data.geojson (puntos azules)
    const dataSource = new VectorSource({
      url: '/data.geojson', // Ruta del archivo GeoJSON
      format: new GeoJSON(),
    });

    // Capa para data.geojson
    const dataLayer = new VectorLayer({
      source: dataSource,
      style: new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({ color: 'blue' }),
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
        pueLayer, // Agregar la capa de puntos rojos
        dataLayer, // Agregar la capa de puntos azules
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

  height: 70vh;
}
</style>
