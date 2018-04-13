<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      app
      id="sidebar"
    >
      <v-list three-line>
        <v-list-group
          v-for="cat in cats"
          :key="cat.name"
          :prepend-icon="cat.icon"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content :style="{ color: cat.color }">
              {{ cat.name }}
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :key="item.name" v-for="item in cat.items"
            @click="bus.$emit('pickLocation', item); drawer = false"
          >
            <loc-tile v-bind="item" />
          </v-list-tile>
        </v-list-group>
      </v-list>
      <div id="credits" class="mt-5 text-xs-center">
        <v-list>
        <v-list-group>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-center">
                Made with <v-icon class="red--text">favorite</v-icon> thanks to...
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="{name, link} in credits" :key="name"
            @click.prevent="open(link)">
            <v-list-tile-content :class="{ underline: link }">
              <v-list-tile-sub-title class="text-xs-center">
                {{ name }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-toolbar app color="white">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer />
      <v-toolbar-title>
        Navigate Miami
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <leaflet-map v-bind="{ zoom, center }"/>
    </v-content>
  </v-app>
</template>

<script>
  import LeafletMap from '@/components/LeafletMap.vue'
  import { locations, categories, credits } from '@/data'
  import LocTile from '@/components/LocationTile.vue'
  import bus from '@/bus'

  export default {
    name: 'app',
    components: {
      LeafletMap,
      LocTile,
    },
    data() {
      return {
        bus,
        drawer: false,
        credits,
        categories,
        locations,
        center: [25.766, -80.195],
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
    methods: {
      open(link) {
        if (link) window.open(link)
      },
    },
  }
</script>

<style scoped lang="scss">
  #sidebar {
    z-index: 2000;
    height: 100%;
  }

  #credits {
    position: absolute;
    bottom: 0;
    width: 100%;

    & /deep/ .list__tile {
      height: 36px;
    }
  }

  .underline {
    text-decoration: underline;
  }
</style>
