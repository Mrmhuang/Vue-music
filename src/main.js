import Vue from 'vue'
import App from './App'
import router from './router/index'
import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'
import store from "./store";

Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false
Vue.use(lazyload,{
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: require('../static/pofire.jpg'),  //放在static文件夹下面直接引用就成功了
  attempt: 1
})


fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
