import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listCategoriesForSearch: []
  },
  mutations: {
    SET_CATEGORIES_FOR_SEARCH (state, data) {
      state.listCategoriesForSearch = data
    }
  },
  actions: {
  },
  getters: {
    CATEGORIES_FOR_SEARCH: state => {return state.listCategoriesForSearch}
  },
  modules: {
  }
})