import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button } from 'mint-ui'
import VueLazyload from 'vue-lazyload'

import './mock/mockServer.js'
import './filters/index.js' // 加载过滤器
// const loading = require('./assets/imgs/loading.gif')
// import loading from './assets/imgs/loading.gif'
// require loading from './assets/imgs/loading.gif'
// import loading from '@/assets/imgs/loading.gif'

Vue.config.productionTip = false
Vue.component(Button.name, Button)
Vue.use(VueLazyload, { // 内部自定义一个指令lazy
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
