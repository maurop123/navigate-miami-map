<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      app
      class="above-map"
    >
      <v-list>
        <v-list-group
          v-for="cat in cats"
          :key="cat.name"
          :prepend-icon="cat.icon"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              {{ cat.name }}
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="item in cat.items"
            :key="item.name"
            @click="center = item.latLon; zoom = 15; coords = [item.latLon]; drawer = false"
          >
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.name }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="white">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer />
      <v-toolbar-title>
        Navigate Miami
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <leaflet-map v-bind="{ zoom, center, coords }"/>
    </v-content>
  </v-app>
</template>

<script>
  import LeafletMap from './components/LeafletMap.vue'
  import { locations, categories } from '@/data'

  export default {
    name: 'app',
    components: {
      LeafletMap,
    },
    data() {
      return {
        drawer: false,
        categories,
        locations,
        center: [25.766, -80.195],
        coords: [
          // [25.776, -80.196],
          // [25.731, -80.236],
        ],
        zoom: 13,
      }
    },
    computed: {
      cats() {
        return this.categories.map(cat => {
          cat.items = this.locations.filter(loc => {
            return loc.categories.indexOf(cat.name) >= 0
          })
          return cat
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .above-map {
    z-index: 2000;
  }
</style>
