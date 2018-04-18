import Vue from 'vue'
import Router from 'vue-router'
import Edit from '@/views/Edit'
import LeafletMap from '@/components/LeafletMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: LeafletMap,
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
    }
  ]
})
