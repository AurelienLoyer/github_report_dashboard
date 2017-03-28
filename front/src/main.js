import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Router from './Router'
import './filters/index'

Vue.use(VueResource)

new Vue({
  el: '#app',
  router: Router,
  render: h => h(App)
})
