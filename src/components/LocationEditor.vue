<template>
  <table-editor v-bind="{ headers, items }" ref="editor">
  </table-editor>
</template>

<script>
  import TableEditor from '@/components/TableEditor'
  import bus from '@/bus'

  export default {
    name: 'location-editor',
    components: {
      TableEditor,
    },
    data() {
      return {
        headers: [{
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
          text: 'Actions',
          value: 'actions', // just to avoid vuetify warning
        }],
      }
    },
    computed: {
      items() {
        return this.$store.state.locations || []
      },
    },
    mounted() {
      bus.$on('open-location-modal', () => {
        this.$refs.editor.open()
      })
    },
  }
</script>
