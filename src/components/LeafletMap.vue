<template>
  <div ref="map" style="height:100%"></div>
</template>

<script>
  import Vue from 'vue'
  import VueCustomElement from 'vue-custom-element'
  // import "leaflet/dist/leaflet.css";
  import L from 'leaflet'
  import LocationTile from '@/components/LocationTile.vue'

  Vue.use(VueCustomElement)
  Vue.customElement('location-tile', LocationTile)

  export default {
    name: 'leaflet-map',
    components: {
      LocationTile,
    },
    props: {
      center: {
        type: Array,
        default: () => [25.766, -80.195],
      },
      zoom: {
        type: Number,
        default: 13,
      },
      coords: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        map: null,
        markers: [],
      }
    },
    watch: {
      center() {
        this.setMapView()
      },
      zoom() {
        this.setMapView()
      },
      coords() {
        this.setMapMarkers()
      },
    },
    mounted() {
      this.map = L.map(this.$refs.map)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
      }).addTo(this.map)
      this.setMapView()
    },
    methods: {
      setMapView() {
        this.map.setView(this.center, this.zoom)
      },
      setMapMarkers() {
        this.markers.forEach(marker => {
          this.map.removeLayer(marker)
        })

        this.markers = this.coords.map(coord => {
          const marker = L.marker(coord)
          this.map.addLayer(marker)
          marker.bindPopup(`
                <location-tile />
          `).openPopup()
          // marker.bindPopup(`
          //       <location-tile />
          // `).openPopup()
  //         marker.bindPopup(`
  // <v-list-tile-content>
  //   <v-list-tile-title>
  //     {{ 'Info Unavailable' }}
  //   </v-list-tile-title>
  // </v-list-tile-content>
  //         `).openPopup()
          return marker
        })
      },
    },
  }
</script>
