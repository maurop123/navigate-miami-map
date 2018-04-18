<template>
  <v-dialog v-model="dialog">
    <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ header }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4 v-if="fields"
              v-for="{ key, label } in fields" :key="key"
            >
              <v-text-field :label="label" v-model="editedItem[key]" />
            </v-flex>
            <v-flex v-else>
              <span class="headline">
                Nothing to edit :-p
              </span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'crud-dialog',
    props: {
      header: String,
      fields: Array,
      item: Object,
    },
    data() {
      const flatObject = obj => obj
      .reduce((item, {key, val}) =>
        Object.assign({}, item, { [key]: val })
      , {})

      const defaultItem = flatObject(this.fields)
      const editedItem = { ...defaultItem, ...this.item }

      return {
        dialog: false,
        defaultItem,
        editedItem,
      }
    },
    methods: {
      close() {
        this.dialog = false
      },
      save() {
        this.$emit('save', this.editedItem)
        this.close()
      },
    },
  }
</script>
