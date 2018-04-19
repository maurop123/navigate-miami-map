<template>
  <table-editor v-bind="{ headers, items }" ref="editor">
  </table-editor>
</template>

<script>
  import TableEditor from '@/components/CatTableEditor'
  import bus from '@/bus'

  export default {
    name: 'category-editor',
    components: {
      TableEditor,
    },
    data() {
      return {
        headers: [{
          text: 'Name',
          value: 'name',
        }, {
          text: 'Material Icon',
          value: 'icon',
        }, {
          text: 'Color',
          value: 'color',
        }, {
          text: 'Actions',
          value: 'actions', // just to avoid vuetify warning
        }],
      }
    },
    computed: {
      items() {
        return this.$store.state.categories || []
      },
    },
    mounted() {
      bus.$on('open-category-modal', () => {
        this.$refs.editor.open()
      })
    },
  }
</script>
