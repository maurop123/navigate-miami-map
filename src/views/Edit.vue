<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-layout class="white">
          <v-flex>
            <v-tabs v-model="activeTab">
              <v-tab key="locations">
                Locations
              </v-tab>
              <v-tab key="categories">
                Categories
              </v-tab>
            </v-tabs>
          </v-flex>
          <v-spacer />
          <v-flex class="text-xs-right">
            <v-btn color="primary" dark class="mb-2"
              @click="open" ref="btn"
            >
              New {{activeTabKey}}
            </v-btn>
          </v-flex>
        </v-layout>
        <v-tabs-items v-model="activeTab">
          <v-tab-item key="locations">
            <location-editor />
          </v-tab-item>
          <v-tab-item key="categories">
            <category-editor />
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import LocationEditor from '@/components/LocationEditor'
  import CategoryEditor from '@/components/CategoryEditor'
  import bus from '@/bus'

  export default {
    name: 'edit-view',
    components: {
      LocationEditor,
      CategoryEditor,
    },
    data() {
      return {
        activeTab: 0,
        selectedItem: {},
        tabKeys: ['location', 'category'],
      }
    },
    computed: {
      activeTabKey() {
        return this.tabKeys[this.activeTab]
      },
    },
    methods: {
      open() {
        bus.$emit(`open-${this.activeTabKey}-modal`)
      },
    },
  }
</script>

<style scoped>
  .white {
    background-color: white;
  }
  .ellipsis {
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
  }
</style>
