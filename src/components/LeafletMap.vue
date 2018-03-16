<template>
  <div ref="map" style="height:100%"></div>
</template>

<script>
  import "leaflet/dist/leaflet.css";
  import L from 'leaflet'

  export default {
    name: 'leaflet-map',
    data() {
      return {
        map: null,
      }
    },
    mounted() {
      this.map = L.map(this.$refs.map).setView([25.766, -80.195], 13)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
      }).addTo(this.map)
    },
  }
</script>
