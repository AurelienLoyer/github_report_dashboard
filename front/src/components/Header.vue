<template lang="html">
  <div id="header">
    <router-link id="logo" to="/">
      <img src="/src/assets/logo.png">
      <span>Github Dashboard</span>
    </router-link>
    <ul id="nav">
      <li><router-link to="/" class="nav-link" :activeClass="'current'" exact>Home</router-link></li>

      <li v-if="connected"><router-link to="/repos" class="nav-link" :activeClass="'current'" exact>Repos</router-link></li>
      <li v-if="connected"><router-link to="/stars" class="nav-link" :activeClass="'current'" exact>Stars</router-link></li>
      <li v-if="connected"><router-link to="/issues" class="nav-link" :activeClass="'current'" exac>Issues</router-link></li>

      <li v-if="connected && 0" class="nav-dropdown-container language">
        <a class="nav-link">Translations</a><span class="arrow"></span>
        <ul class="nav-dropdown">
          <li><a href="https://cn.vuejs.org/" class="nav-link" target="_blank">中文</a></li>
          <li><a href="https://jp.vuejs.org/" class="nav-link" target="_blank">日本語</a></li>
          <li><a href="https://ru.vuejs.org/" class="nav-link" target="_blank">Русский</a></li>
          <li><a href="https://kr.vuejs.org/" class="nav-link" target="_blank">한국어</a></li>
        </ul>
      </li>

      <li v-if="!connected"><a href="/auth/github">Login</a></li>
      <li v-if="connected && me" class="mebar">
        <router-link to="/me">
          <img :src="me.avatar_url" alt="">
          <span>{{me.login}}</span>
        </router-link>
      </li>

    </ul>

  </div>
</template>

<script>

import auth from '../auth'

export default {
  name: 'header',
  data () {
    return {
      connected: auth.checkAuth(),
      me: null
    }
  },
  created(){
    console.log(auth.checkAuth())
    if(auth.checkAuth())(
      this.me = JSON.parse(localStorage.getItem('me'))
    )
    console.log(this.me)
  },
  methods:{
  }
}
</script>

<style lang="scss">

.mebar{
    height: 25px;
    display: flex;
    align-items: center;
    border-radius: 50%;
    img{
      height: 25px;
    }
}

#nav {
  .nav-link {
    cursor: pointer;
  }
  .nav-dropdown-container {
    .nav-link:hover {
      border-bottom: none;
    }
    &:hover .nav-dropdown {
      display: block;
    }
    &.language {
      margin-left: 20px;
    }
    .arrow {
      pointer-events: none;
    }
  }
  .nav-dropdown {
    display: none;
    box-sizing: border-box;
    max-height: calc(100vh - 61px);
    overflow-y: scroll;
    position: absolute;
    top: 100%;
    right: -15px;
    background-color: #fff;
    padding: 10px 0;
    border: 1px solid #ddd;
    border-bottom-color: #ccc;
    text-align: left;
    border-radius: 4px;
    white-space: nowrap;
    li {
      line-height: 1.8em;
      margin: 0;
      display: block;
      > ul {
        padding-left: 0;
      }
      &:first-child h4 {
        margin-top: 0;
        padding-top: 0;
        border-top: 0;
      }
    }
    a {
      padding: 0 24px 0 20px;
    }
    h4 {
      padding: 0 24px 0 20px;
      margin: 0.45em 0 0;
      padding-top: 0.45em;
      border-top: 1px solid #eee;
    }
    a {
      color: #3a5169;
      font-size: 0.9em;
      display: block;
      &:hover {
        color: #42b983;
      }
    }
  }
  .arrow {
    display: inline-block;
    vertical-align: middle;
    margin-top: -1px;
    margin-left: 6px;
    margin-right: -14px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #ccc;
  }
}

#header {
  background-color: #fff;
  height: 40px;
  padding: 10px 0px;
  position: relative;
  z-index: 2;
}

body {
  #header {
    position: fixed;
    width: 100%;
    top: 0;
  }
  #nav {
    position: fixed;
  }
}

#nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 60px;
  top: 10px;
  height: 40px;
  line-height: 40px;
  .break {
    display: none;
  }
  li {
    display: inline-block;
    position: relative;
    margin: 0 0.6em;
  }
}

.nav-link {
  padding-bottom: 3px;
  &:hover, &.current {
    border-bottom: 3px solid #42b983;
  }
}

#logo {
  display: inline-block;
  font-size: 1.5em;
  line-height: 40px;
  color: #2c3e50;
  font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
  img {
    vertical-align: middle;
    margin-right: 6px;
    width: 40px;
    height: 40px;
  }
}

@media screen and (max-width: 900px) {
  #header {

  }
  #logo {
    float: left;
    margin-left: 10px;
    span{
      display: none;
    }
  }
  #nav{
    text-align: right;
    margin-left: 20px;
  }

  .mebar{
    span{
      display: none;
    }
  }
}


</style>
