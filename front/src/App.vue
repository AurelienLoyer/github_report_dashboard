<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>

<script>

import 'font-awesome/css/font-awesome.css'; // http://fontawesome.io/
//require("bootstrap-grid")
import auth from './auth'
import env from 'env'
import Header from './components/Header.vue'

export default {
  name: 'app',
  data () {
    return {
      connected: auth.checkAuth()
    }
  },
  components: {
    'v-header':Header,
  },
  created(){
  },
  methods:{
  }
}
</script>

<style lang="scss">
body{
  background: #F6F7F7
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}

.clearfix:after, .clearfix:before, .container-fluid:after, .container-fluid:before, .container:after, .container:before, .row:after, .row:before {
  display: none!important;
}
</style>
