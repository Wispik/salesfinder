import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/wb/category'
  },
  {
    path: '/(wb|ozon)/(category|products|brands|sellers|rating)',
    name: 'MainInfo',
    component: Home
  },
  {
    path: '/wb/category/info',
    name: 'CategoryInfo',
    component: () => import('../views/CategoryInfo.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
