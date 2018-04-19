<template>
  <crud-dialog
    header="Edit Location"
    :item="item"
    @save="save"
    @cancel="cancel"
    ref="locationModal"
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
</template>

<script>
  import CrudDialog from '@/components/CrudDialog'
  import bus from '@/bus'

  export default {
    name: 'location-modal',
    props: {
      item: Object,
    },
    components: {
      CrudDialog,
    },
    computed: {
      categories() {
        return this.$store.state.categories.map(c => c.name)
      },
    },
    mounted() {
      bus.$on('openLocationModal', () => {
        this.$refs.locationModal.open()
      })
    },
    methods: {
      save(item) {
        this.$store.dispatch('save', item)
        this.$emit('save', item)
      },
      cancel() {
        this.$emit('cancel')
      },
    },
  }
</script>
