<template>
  <v-list-tile-content>
    <template v-if="name">
      <v-list-tile-title class="body-2">
        {{ name }}
      </v-list-tile-title>
      <v-list-tile-title class="body-1"
        v-if="address">
        {{ address }}
      </v-list-tile-title>
      <v-list-tile-sub-title class="caption"
        v-if="siteText">
        {{ siteText }}
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
  export default {
    name: 'location-tile',
    props: {
      name: String,
      address: String,
      siteText: String,
      siteUrl: String,
    },
  }
</script>
