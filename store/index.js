import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

export const actions = {
  async nuxtServerInit({commit}, {req, app}) {
    {
      const {status, data: {province, city}} = await app.$axios.get('/geo/getPosition')
      commit('geo/setPosition', status === 200 ? {city, province} : {city: '', province: ''})
    }

    {
      const {status, data: {menu}} = await app.$axios.get('/geo/menu')
      commit('home/setMenu', status === 200 ? menu : [])
    }

    {
      //console.log(app)
      const {status, data: {result}} = await app.$axios.get('/search/hotPlace', {
        params: {
          city: app.store.state.geo.position.city.replace('市', '')
        }
      })
      commit('search/setHotPlace', status === 200 ? result : [])
    }

  }
}
