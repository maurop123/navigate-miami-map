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
    categories: [{
      name: 'Education',
      icon: 'school',
      color: 'rgb(0,102,255)',
    }, {
      name: 'Funding',
      icon: 'flash_on',
      color: 'green',
    }, {
      name: 'Economic Dev',
      icon: 'trending_up',
      color: 'orange',
    }, {
      name: 'Regular Events',
      icon: 'audiotrack',
      color: '#dada00',
    }, {
      name: 'Coworking',
      icon: 'devices',
      color: '#e6aeb8',
    }, {
      name: 'Maker Space',
      icon: 'build',
      color: 'purple',
    }],
  },
  mutations: {
    popLocation: pop('locations'),
    setLocations: set('locations'),
    updateLocations: updateCollection('locations'),
    removeLocation(state, payload) {
      const index = state.locations.indexOf(payload)
      state.locations.splice(index, 1)
    },
  },
  actions: {
    hydrate({ dispatch }) {
      dispatch('getLocations')
    },
    getLocations({ commit }) {

      db.get('locations').subscribe(locs => {
        if (locs) {
          commit('setLocations', locs)
        }
      })
    },
    save({ commit }, payload) {
      commit('updateLocations', payload)

      db.update('locations', payload).subscribe(res => {
        if (!payload.id) commit('popLocation')
        commit('updateLocations', res)
      })
    },
    del({ commit }, payload) {
      commit('removeLocation', payload)

      db.del('locations', payload).subscribe()
    },
  },
  plugins: [createPersistedState({ key: 'navigate-miami-2' })],
})
