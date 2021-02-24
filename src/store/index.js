import { createStore } from 'vuex'
import axios from 'axios'
import { types } from './types'

const urls = {
  location: 'https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json',
  store: 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json'
}

export default createStore({
  state: {
    currentCity: '臺北市',
    currentDistrict: '中正區',
    location: [],
    stores: []
  },
  getters: {
    cities (state) {
      return state.location.map(e => e.name)
    },
    districts (state) {
      return state.location.find(e => e.name === state.currentCity)?.districts || []
    },
    filteredStores (state) {
      return state.stores.filter(e =>
        e.county === state.currentCity &&
        e.town === state.currentDistrict
      )
    }
  },
  mutations: {
    [types.SET_CURRENT_CITY] (state, payload) {
      state.currentCity = payload
    },
    [types.SET_CURRENT_DISTRICT] (state, payload) {
      state.currentDistrict = payload
    },
    [types.SET_LOCATION] (state, payload) {
      state.location = payload
    },
    [types.SET_STORES] (state, payload) {
      state.stores = payload
    }
  },
  actions: {
    async [types.FETCH_LOCATION] ({ commit }) {
      try {
        const res = await axios.get(urls.location)
        const { data } = res
        commit(types.SET_LOCATION, data)
        return {
          state: 'success',
          data,
          errInfo: null
        }
      } catch (err) {
        return {
          state: 'err',
          data: null,
          errInfo: err
        }
      }
    },
    async [types.FETCH_STORES] ({ commit }) {
      try {
        const res = await axios.get(urls.store)
        let { data } = res
        data = data.features.map(e => ({
          ...e.properties,
          lat: e.geometry.coordinates[0],
          lng: e.geometry.coordinates[1]
        }))
        commit(types.SET_STORES, data)
        return {
          state: 'success',
          data,
          errInfo: null
        }
      } catch (err) {
        return {
          state: 'err',
          data: null,
          errInfo: err
        }
      }
    }
  }
})
