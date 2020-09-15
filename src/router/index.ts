import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login/Login.vue'
import Shop from '../views/Shop/Shop.vue'
import ShopGoods from '../views/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../views/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../views/Shop/ShopInfo/ShopInfo.vue'

const MSite = () => import('../views/MSite/MSite.vue')
const Search = () => import('../views/Search/Search.vue')
const Profile = () => import('../views/Profile/Profile.vue')
const Order = () => import('../views/Order/Order.vue')

// import MSite from '../views/MSite/MSite.vue'
// import Search from '../views/Search/Search.vue'
// import Profile from '../views/Profile/Profile.vue'
// import Order from '../views/Order/Order.vue'

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
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        name: 'ShopGoods',
        component: ShopGoods
      },
      {
        path: '/shop/ratings',
        name: 'ShopRatings',
        component: ShopRatings
      },
      {
        path: '/shop/info',
        name: 'ShopInfo',
        component: ShopInfo
      },
      {
        path: '',
        redirect: '/shop/goods'
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
