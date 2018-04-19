<template>
  <div>
    <crud-dialog
      header="Edit Location"
      :item="selectedItem"
      @save="save"
      ref="editorModal"
      hide-activator
    >
      <template slot-scope="{ editedItem }">
        <v-flex xs12 sm6>
          <v-text-field label="Name" v-model="editedItem.name" />
        </v-flex>
        <v-flex xs12 sm6>
          <v-select v-model="editedItem.category"
            label="Category"
            :items="categories"
          />
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Address" v-model="editedItem.address" />
        </v-flex>
        <v-flex xs6 sm3>
          <v-text-field label="Lat" v-model="editedItem.lat" />
        </v-flex>
        <v-flex xs6 sm3>
          <v-text-field label="Lon" v-model="editedItem.lon" />
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field label="Website" v-model="editedItem.website" />
        </v-flex>
      </template>
    </crud-dialog>
    <v-data-table v-bind="{ headers, items }" hide-actions>
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
  </div>
</template>

<script>
  import CrudDialog from '@/components/CrudDialog'

  export default {
    name: 'location-editor',
    props: {
      headers: Array,
      items: Array,
    },
    components: {
      CrudDialog,
    },
    data() {
      return {
        selectedItem: {},
      }
    },
    computed: {
      categories() {
        return this.$store.state.categories.map(c => c.name)
      },
    },
    methods: {
      open() {
        this.$refs.editorModal.open()
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
      save(item) {
        this.$store.dispatch('save', item)
      },
    },
  }
</script>
