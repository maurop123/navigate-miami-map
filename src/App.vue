<template>
  <v-app>
    <!-- <v&#45;navigation&#45;drawer -->
    <!--   persistent -->
    <!--   :mini&#45;variant="miniVariant" -->
    <!--   :clipped="clipped" -->
    <!--   v&#45;model="drawer" -->
    <!--   enable&#45;resize&#45;watcher -->
    <!--   fixed -->
    <!--   app -->
    <!-- > -->
    <!--   <v&#45;list> -->
    <!--     <v&#45;list&#45;tile -->
    <!--       value="true" -->
    <!--       v&#45;for="(item, i) in items" -->
    <!--       :key="i" -->
    <!--     > -->
    <!--       <v&#45;list&#45;tile&#45;action> -->
    <!--         <v&#45;icon v&#45;html="item.icon"></v&#45;icon> -->
    <!--       </v&#45;list&#45;tile&#45;action> -->
    <!--       <v&#45;list&#45;tile&#45;content> -->
    <!--         <v&#45;list&#45;tile&#45;title v&#45;text="item.title"></v&#45;list&#45;tile&#45;title> -->
    <!--       </v&#45;list&#45;tile&#45;content> -->
    <!--     </v&#45;list&#45;tile> -->
    <!--   </v&#45;list> -->
    <!-- </v&#45;navigation&#45;drawer> -->
    <v-toolbar app>
      <!-- <v&#45;toolbar&#45;side&#45;icon @click.stop="drawer = !drawer"></v&#45;toolbar&#45;side&#45;icon> -->
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <!-- <v&#45;navigation&#45;drawer -->
    <!--   temporary -->
    <!--   :right="right" -->
    <!--   v&#45;model="rightDrawer" -->
    <!--   fixed -->
    <!--   app -->
    <!-- > -->
    <!--   <v&#45;list> -->
    <!--     <v&#45;list&#45;tile @click="right = !right"> -->
    <!--       <v&#45;list&#45;tile&#45;action> -->
    <!--         <v&#45;icon>compare_arrows</v&#45;icon> -->
    <!--       </v&#45;list&#45;tile&#45;action> -->
    <!--       <v&#45;list&#45;tile&#45;title>Switch drawer (click me)</v&#45;list&#45;tile&#45;title> -->
    <!--     </v&#45;list&#45;tile> -->
    <!--   </v&#45;list> -->
    <!-- </v&#45;navigation&#45;drawer> -->
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      title: 'Location Editor - Nav Miami'
    }
  }
}
</script>
