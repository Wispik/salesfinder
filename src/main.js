import Vue from 'vue'
import App from './App.vue'

import './assets/scss/style.scss'
import router from './router'

import store from './store'

import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)

import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
Vue.component('vue-custom-scrollbar', vueCustomScrollbar)

import DefaultLayout from "./layouts/DefaultLayout.vue"
import EmptyLayout from "./layouts/EmptyLayout.vue"

Vue.component("default-layout", DefaultLayout)
Vue.component("empty-layout", EmptyLayout)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
