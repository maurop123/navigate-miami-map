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
  import bus from '@/bus'

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
        bus,
        map: null,
        locations,
      }
    },
    computed: {
      markers() {
        return this.locations.map(l => {
          const marker = L.marker(l.latLon, {
            title: l.name,
            alt: l.name,
          })
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
    mounted() {
      this.map = L.map(this.$refs.map)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
      }).addTo(this.map)
      this.setMapView(this.center, this.zoom)
      this.showAllMarkers()
      this.bus.$on('pickLocation', val => this.handleLocationClick(val))
    },
    methods: {
      setMapView(center, zoom) {
        this.map.setView(center, zoom)
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
      handleLocationClick(loc) {
        this.setMapView(loc.latLon, 15)
        this.markers.filter(m => m.options.title === loc.name)
        .forEach(m => m.openPopup())
      },
    },
  }
</script>
