<template>
  <div ref="map" style="height:100%"></div>
</template>

<script>
  import Vue from 'vue'
  import VueCustomElement from 'vue-custom-element'
  import "leaflet/dist/leaflet.css";
  import L from 'leaflet'
  import '@/assets/svg-icon'
  import { categories } from '@/data'
  import LocationTile from '@/components/LocationTile.vue'
  import bus from '@/bus'

  Vue.use(VueCustomElement)
  Vue.customElement('location-tile', LocationTile)

  export default {
    name: 'leaflet-map',
    components: {
      LocationTile,
    },
    data() {
      return {
        bus,
        map: null,
        center: [25.766, -80.195],
        zoom: 13,
        markers: [],
      }
    },
    props: {
      locations: {
        type: Array,
        default() { return this.$store.state.locations },
      },
      categories: {
        type: Array,
        default() { return this.$store.state.categories },
      },
    },
    watch: {
      locations(val) {
        if (val && this.categories) {
          this.setMarkers()
        }
      },
      categories(val) {
        if (val && this.locations) {
          this.setMarkers()
        }
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
      setMarkers() {
        this.hideAllMarkers()
        this.makers = []
        this.addMarkers()
        this.showAllMarkers()
      },
      addMarkers() {
        this.markers = this.locations
        .filter(({lat, lon}) => lat && lon)
        .filter(l => this.getCatsColor(l))
        .map(l => {
          const marker = L.marker.svgMarker([l.lat, l.lon], {
            title: l.name,
            alt: l.name,
            iconOptions: {
              fillOpacity: 1,
              color: this.getCatsColor(l),
            },
          })
          marker.bindPopup(`
            <location-tile
              name="${l.name}"
              address="${l.address}"
              website="${l.website}"
              clickable
            />
          `)
          return marker
        })
      },
      getCatsColor(loc) {
        const cat = this.categories.find(c => c.id === loc.category)
        return cat ? cat.color : false
      },
      handleLocationClick(loc) {
        this.setMapView([loc.lat, loc.lon], 15)
        this.markers.filter(m => m.options.title === loc.name)
        .forEach(m => m.openPopup())
      },
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
    },
  }
</script>
