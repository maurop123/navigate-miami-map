<template>
  <div>
    <crud-dialog
      header="Edit Category"
      :item="selectedItem"
      @save="save"
      ref="editorModal"
      hide-activator
    >
      <template slot-scope="{ editedItem }">
        <v-flex xs12 sm4>
          <v-text-field label="Name" v-model="editedItem.name" />
        </v-flex>
        <v-flex xs6 sm4>
          <v-text-field label="Material Icon" v-model="editedItem.icon" />
        </v-flex>
        <v-flex xs6 sm4>
          <v-text-field label="Color" v-model="editedItem.color" />
        </v-flex>
      </template>
    </crud-dialog>
    <v-data-table v-bind="{ headers, items }" hide-actions>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.icon }}</td>
        <td class="text-xs-right">{{ props.item.color }}</td>
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
    name: 'cat-table-editor',
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
    methods: {
      open() {
        this.$refs.editorModal.open()
      },
      editItem(item) {
        this.selectedItem = item
      },
      save(item) {
        this.$store.dispatch('saveCategory', item)
      },
      deleteItem(item) {
        this.$store.dispatch('delCategory', item)
        this.resetSelectedItem()
      },
      resetSelectedItem() {
        this.selectedItem = {}
      },
    },
  }
</script>
