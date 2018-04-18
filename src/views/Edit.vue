<template>
  <v-container>
    <v-layout>
      <v-flex>
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
            <td class="text-xs-right">{{ props.item.lat }}</td>
            <td class="text-xs-right">{{ props.item.lon }}</td>
            <td class="text-xs-right">{{ props.item.website }}</td>
            <td class="text-xs-right">{{ props.item.address }}</td>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import LocationModal from '@/components/LocationModal'

  export default {
    name: 'edit-view',
    components: {
      LocationModal,
    },
    data() {
      return {
        selectedItem: {},
        locationHeaders: [{
          text: 'Name',
          value: 'name',
        }, {
          text: 'Category',
          value: 'category',
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
          text: 'Address',
          value: 'address',
        }, {
          text: 'Actions'
        }],
      }
    },
    computed: {
      locationItems() {
        return this.$store.state.locations.map(l => {
          return l
        }) || []
      },
    },
    methods: {
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
