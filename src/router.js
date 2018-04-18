import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Edit from '@/views/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Edit
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
