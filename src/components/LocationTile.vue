<template>
  <v-list-tile-content>
    <template v-if="name">
      <v-list-tile-title class="body-2 bold">
        {{ name }}
      </v-list-tile-title>
      <v-list-tile-title class="body-1"
        v-if="address">
        {{ address }}
      </v-list-tile-title>
      <v-list-tile-sub-title class="caption clickable"
        v-if="website && website !== 'undefined'"
        @click="clickable && open(website)">
        {{ website }}
        <v-icon small v-if="clickable">open_in_new</v-icon>
      </v-list-tile-sub-title>
    </template>
    <template v-else>
      <v-list-tile-title>
        Info Unavailable
      </v-list-tile-title>
    </template>
  </v-list-tile-content>
</template>

<script>
  import { open } from '@/utils'

  export default {
    name: 'location-tile',
    props: {
      name: String,
      address: String,
      website: String,
      clickable: Boolean,
    },
    methods: {
      open,
    },
  }
</script>

<style scoped>
  .bold {
    font-weight: 900;
  }
</style>
