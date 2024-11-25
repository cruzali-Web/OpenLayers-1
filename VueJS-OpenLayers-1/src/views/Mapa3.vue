<template>
  <div ref="mapContainer" class="map"></div>
</template>

<script>
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import { Fill, Stroke, Style } from 'ol/style';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { transform, get } from 'ol/proj';
import { ScaleLine } from 'ol/control';
import { defaults as defaultControls, Zoom, Attribution } from 'ol/control';




// Registrar la proyección EPSG:32614
proj4.defs(
  'EPSG:32614',
  '+proj=utm +zone=14 +datum=WGS84 +units=m +no_defs'
);
register(proj4);


/* GEOJSON ->
  {
  "type": "FeatureCollection",
  "name": "Estado_Pue",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::32614" } },
  "features": [
  { "type": "Feature", "properties": { "CVEGEO": "21086", "CVE_ENT": "21", "CVE_MUN": "086", "NOMGEO": "Jalpan", "NOM_REGION": "Sierra Norte" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 
*/


export default {
  name: 'Mapa3',
  mounted() {
    const projection32614 = get('EPSG:32614');
    if (!projection32614) {
      console.error('Proyección EPSG:32614 no registrada');
      return;
    }

    // Transformar coordenadas iniciales (UTM -> Web Mercator)
    const initialCoordinates = [608650, 2268331]; // Coordenadas UTM en EPSG:32614
    const centerCoordinates = transform(initialCoordinates, 'EPSG:32614', 'EPSG:3857');

    // Fuente del GeoJSON
    const geojsonSource = new VectorSource({
      url: '/Estado_Pue.geojson', // Ruta al archivo en la carpeta public
      format: new GeoJSON(),
    });

    geojsonSource.on('featuresloaderror', () => {
      console.error('Error al cargar el archivo GeoJSON');
    });

    const geojsonLayer = new VectorLayer({
      source: geojsonSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(0, 128, 255, 0.3)', // Color de relleno
        }),
        stroke: new Stroke({
          color: 'blue', // Color del borde
          width: 1,
        }),
      }),
    });

    // Crear el mapa
    new Map({
      target: this.$refs.mapContainer,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        geojsonLayer,
      ],
      view: new View({
        center: centerCoordinates,
        zoom: 8,
        projection: 'EPSG:3857',
      }),
      controls: [], // SIN controles 
      // controls: defaultControls({ attribution: false }).extend([
      //   new Zoom(), // Agregar el control de zoom
      //   new Attribution({ collapsible: false }), // Agregar control de atribución sin colapsar
      // ]),
    });
  },
};
</script>

<style>
.map {
  /* width: 80vw; */
  height: 70vh;
}

.ol-zoom {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
}

.ol-zoom button {
  color: white;
}
</style>
