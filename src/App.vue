<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      disable-resize-watcher
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
          >
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.name }}
              </v-list-tile-title>
              <!-- <v&#45;list&#45;tile&#45;subtitle> -->
              <!--   120 SW 8th St, Miami, FL 33130, USA -->
              <!-- </v&#45;list&#45;tile&#45;subtitle> -->
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
      <leaflet-map />
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
          }],
          icon: 'school',
        }, {
          name: 'Accelerator',
          items: [{
            'name': 'Watsco Ventures',
          }],
          icon: 'directions_run',
        }],
      }
    },
  }
</script>

<style scoped lang="scss">
  .above-map {
    z-index: 2000;
  }
</style>
