import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listCategoriesForSearch: [],
    userLists: []
  },
  mutations: {
    SET_CATEGORIES_FOR_SEARCH (state, data) {
      state.listCategoriesForSearch = data
    },
    ADD_TO_USER_LISTS(state, data) {
      state.userLists.push(data)
    },
    DELETE_FROM_USER_LISTS_BY_ID (state, id) {
      let arr = state.userLists.filter(item => item.id != id)
      state.userLists = [...arr]
    },
    EDIT_USER_LISTS_BY_ID (state, params) {
      const edit = (arr, id, t, d) => arr.map(n => n.id === id ? { ...n, title: t, description: d } : n);
      state.userLists = edit(state.userLists, params.id, params.title, params.description)
    }
  },
  actions: {
  },
  getters: {
    CATEGORIES_FOR_SEARCH: state => {return state.listCategoriesForSearch},
    USER_LISTS: state => {return state.userLists}
  },
  modules: {
  }
})