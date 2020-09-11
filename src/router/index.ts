import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MSite from '../views/MSite/MSite.vue'
import Search from '../views/Search/Search.vue'
import Profile from '../views/Profile/Profile.vue'
import Order from '../views/Order/Order.vue'
import Login from '../views/Login/Login.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/msite',
    name: 'MSite',
    component: MSite,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/',
    redirect: 'msite'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
