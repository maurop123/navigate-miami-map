<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn v-if="!hideActivator" slot="activator"
      color="primary" dark class="mb-2"
    >
      New Item
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ header }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <slot :editedItem="editedItem">
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
            </slot>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" flat @click.native="reset">Reset</v-btn>
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
      hideActivator: Boolean,
    },
    data() {
      const flatObject = obj => obj
      .reduce((item, {key, val}) =>
        Object.assign({}, item, { [key]: val })
      , {})

      const defaultItem = this.fields ? flatObject(this.fields) : {}
      const editedItem = defaultItem

      return {
        dialog: false,
        defaultItem,
        editedItem,
      }
    },
    watch: {
      item(val) {
        if (val && Object.keys(val).length > 0) {
          this.editedItem = val
          this.dialog = true
        }
      },
    },
    methods: {
      close() {
        this.dialog = false
        this.$emit('cancel')
      },
      save() {
        this.$emit('save', this.editedItem)
        this.reset()
        this.close()
      },
      reset() {
        // this.editedItem = this.defaultItem
        this.editedItem = {}
      },
      open() {
        this.dialog = true
      },
    },
  }
</script>
