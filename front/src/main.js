import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Router from './Router'
import './filters/index'
import Trend from 'vuetrend'
import VueAnalytics from 'vue-analytics'

Vue.use(VueResource)
Vue.use(Trend)

vue.use(VueAnalytics,{
  id:'UA-126838160-1',
})

new Vue({
  el: '#app',
  router: Router,
  render: h => h(App)
})
