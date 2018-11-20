<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      app
      id="sidebar"
      class="pb-0"
    >
      <v-list three-line class="custom-flex fill-height">
        <v-list-group
          v-for="cat in cats"
          :key="cat.name"
          :prepend-icon="cat.icon"
          no-action
          class="shrink"
          @input="e => toggleCat(cat, e)"
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
        <div class="y-spacer" />
        <v-list-group id="credits">
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
    </v-navigation-drawer>
    <v-toolbar app color="white">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer />
      <v-toolbar-title class="clickable" @click="$router.push('/')">
        Navigate Miami
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view v-bind="{ locations }" :categories="mapCats" />
    </v-content>
  </v-app>
</template>

<script>
  import { credits } from '@/data'
  import LocTile from '@/components/LocationTile.vue'
  import bus from '@/bus'
  import _sortBy from 'lodash/sortBy'
  import { open } from '@/utils'

  export default {
    name: 'app',
    components: {
      LocTile,
    },
    data() {
      return {
        bus,
        drawer: false,
        credits,
        activeCat: null,
      }
    },
    computed: {
      categories() { return this.$store.state.categories },
      locations() { return this.$store.state.locations },
      cats() {
        return _sortBy(this.categories.map(cat => {
          cat.items = this.locations.filter(loc => {
            return loc.category === cat.id
          })
          return cat
        }), ['name'])
      },
      mapCats() {
        return this.activeCat ? [this.activeCat] : this.categories
      },
    },
    methods: {
      open,
      toggleCat(cat, val) {
        this.activeCat = val ? cat : null
      }
    },
  }
</script>

<style scoped lang="scss">
  #sidebar {
    z-index: 2000;
    height: 100%;
  }

  #credits {
    & /deep/ .list__tile {
      height: 36px;
    }
  }

  .underline {
    text-decoration: underline;
  }

  .y-spacer {
    flex-grow: 1;
  }

  .custom-flex {
    display: flex;
    flex-direction: column;
  }

  .shrink /deep/ .list__group__header > div:not(.list__group__header__prepend-icon):not(.list__group__header__append-icon) {
    flex: 1 1 auto;
  }
</style>

<style lang="scss">
  .clickable {
    cursor: pointer;
  }
</style>
