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
            <location-modal
              :item="selectedItem"
              @save="resetSelectedItem"
              @cancel="resetSelectedItem"
            />
            <v-data-table
              :headers="locationHeaders"
              :items="locationItems"
              hide-actions
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.category }}</td>
                <td class="text-xs-right">{{ props.item.address }}</td>
                <td class="text-xs-right">{{ props.item.lat }}</td>
                <td class="text-xs-right">{{ props.item.lon }}</td>
                <td class="text-xs-right">{{ props.item.website }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="editItem(props.item)">
                    <v-icon color="blue">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="red">delete</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item key="categories">
            <location-modal
              :item="selectedItem"
              @save="resetSelectedItem"
              @cancel="resetSelectedItem"
            />
            <v-data-table
              :headers="locationHeaders"
              :items="locationItems"
              hide-actions
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.category }}</td>
                <td class="text-xs-right">{{ props.item.address }}</td>
                <td class="text-xs-right">{{ props.item.lat }}</td>
                <td class="text-xs-right">{{ props.item.lon }}</td>
                <td class="text-xs-right">{{ props.item.website }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="editItem(props.item)">
                    <v-icon color="blue">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="red">delete</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import LocationModal from '@/components/LocationModal'
  import bus from '@/bus'

  export default {
    name: 'edit-view',
    components: {
      LocationModal,
    },
    data() {
      return {
        activeTab: 0,
        selectedItem: {},
        locationHeaders: [{
          text: 'Name',
          value: 'name',
        }, {
          text: 'Category',
          value: 'category',
        }, {
          text: 'Address',
          value: 'address',
        }, {
          text: 'Lat',
          value: 'lat',
        }, {
          text: 'Lon',
          value: 'lon',
        }, {
          text: 'Website',
          value: 'website',
        }, {
          text: 'Actions'
        }],
        tabKeys: ['location', 'category'],
      }
    },
    computed: {
      activeTabKey() {
        return this.tabKeys[this.activeTab]
      },
      locationItems() {
        return this.$store.state.locations.map(l => {
          return l
        }) || []
      },
    },
    methods: {
      open() {
        bus.$emit('openLocationModal')
      },
      editItem(item) {
        this.selectedItem = item
      },
      deleteItem(item) {
        this.$store.dispatch('del', item)
        this.resetSelectedItem()
      },
      resetSelectedItem() {
        this.selectedItem = {}
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
