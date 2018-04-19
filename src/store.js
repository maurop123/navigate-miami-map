import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import { store, Database } from 'mauromadeit-vue-commons'
const db = new Database({ ref: 'navigate-miami' })
const { set, pop, updateCollection } = store

export default new Vuex.Store({
  state: {
    locations: [],
    categories: [],
  },
  mutations: {
    popLocation: pop('locations'),
    setLocations: set('locations'),
    updateLocations: updateCollection('locations'),
    removeLocation(state, payload) {
      const index = state.locations.indexOf(payload)
      state.locations.splice(index, 1)
    },
    popCategory: pop('categories'),
    setCategories: set('categories'),
    updateCategories: updateCollection('categories'),
    removeCategory(state, payload) {
      const index = state.categories.indexOf(payload)
      state.categories.splice(index, 1)
    },
  },
  actions: {
    hydrate({ dispatch }) {
      dispatch('getLocations')
      dispatch('getCategories')
    },
    getLocations({ commit }) {

      db.get('locations').subscribe(locs => {
        if (locs) {
          commit('setLocations', locs)
        }
      })
    },
    getCategories({ commit }) {

      db.get('categories').subscribe(cats => {
        if (cats) {
          commit('setCategories', cats)
        }
      })
    },
    saveCategory({ commit }, payload) {
      commit('updateCategories', payload)

      db.update('categories', payload).subscribe(res => {
        if (!payload.id) commit('popCategory')
        commit('updateCategories', res)
      })
    },
    saveLocation({ commit }, payload) {
      commit('updateLocations', payload)

      db.update('locations', payload).subscribe(res => {
        if (!payload.id) commit('popLocation')
        commit('updateLocations', res)
      })
    },
    delLocation({ commit }, payload) {
      commit('removeLocation', payload)

      db.del('locations', payload).subscribe()
    },
    delCategory({ commit }, payload) {
      commit('removeCategory', payload)

      db.del('categories', payload).subscribe()
    },
  },
  plugins: [createPersistedState({ key: 'navigate-miami-4' })],
})
