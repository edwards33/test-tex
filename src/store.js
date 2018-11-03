import Vue from 'vue'
import Vuex from 'vuex'
import ContactModule from './store-modules/contact'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ContactModule
  }
})