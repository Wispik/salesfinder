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
    path: '/(wb|ozon)/(category|products|brands|sellers)',
    name: 'MainInfo',
    component: Home
  },
  {
    path: '/(wb|ozon)/ratings',
    name: 'Ratings',
    component: () => import('../views/Ratings.vue')
  },
  {
    path: '/wb/category/info',
    name: 'CategoryInfo',
    component: () => import('../views/CategoryInfo.vue')
  },
  {
    path: '/wb/category/info-v2',
    name: 'CategoryInfov2',
    component: () => import('../views/CategoryInfo_v2.vue')
  },
  {
    path: '/lists',
    name: 'Lists',
    component: () => import('../views/Lists.vue')
  },
  {
    path: '/list/:id',
    name: 'ListView',
    component: () => import('../views/ListView.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
