<template>
  <div ref="map" style="height:100%"></div>
</template>

<script>
  import Vue from 'vue'
  import VueCustomElement from 'vue-custom-element'
  // import "leaflet/dist/leaflet.css";
  import L from 'leaflet'
  import LocationTile from '@/components/LocationTile.vue'
  import { locations } from '@/data'

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
        locations,
      }
    },
    computed: {
      markers() {
        return this.locations.map(l => {
          const marker = L.marker(l.latLon)
          marker.bindPopup(`
            <location-tile
              name="${l.name}"
              address="${l.address}"
              site-text="${l.siteText}"
            />
          `)
          return marker
        })
      },
    },
    watch: {
      center() {
        this.setMapView()
      },
      zoom() {
        this.setMapView()
      },
      coords(val) {
        this.setMapMarkers(val)
      },
    },
    mounted() {
      this.map = L.map(this.$refs.map)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
      }).addTo(this.map)
      this.setMapView()
      this.showAllMarkers()
    },
    methods: {
      setMapView() {
        this.map.setView(this.center, this.zoom)
      },
      hideAllMarkers() {
        this.markers.forEach(marker => {
          this.map.removeLayer(marker)
        })
      },
      showAllMarkers() {
        this.markers.forEach(marker => {
          this.map.addLayer(marker)
        })
      },
      setMapMarkers(coords) {
        this.hideAllMarkers()
      },
    },
  }
</script>
