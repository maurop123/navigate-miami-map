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
          v-for="category in categories"
          :key="category.name"
          :prepend-icon="category.icon"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              {{ category.name }}
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="item in category.items"
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

  export default {
    name: 'app',
    components: {
      LeafletMap,
    },
    data() {
      return {
        drawer: false,
        categories: [{
          name: 'Education',
          items: [{
            name: 'Ironhack',
            latLon: [25.776, -80.196],
          }],
          icon: 'school',
        }, {
          name: 'Accelerator',
          items: [{
            name: 'Watsco Ventures',
            latLon: [25.731, -80.236],
          }],
          icon: 'directions_run',
        }],
        center: [25.766, -80.195],
        coords: [
          // [25.776, -80.196],
          // [25.731, -80.236],
        ],
        zoom: 13,
      }
    },
  }
</script>

<style scoped lang="scss">
  .above-map {
    z-index: 2000;
  }
</style>
