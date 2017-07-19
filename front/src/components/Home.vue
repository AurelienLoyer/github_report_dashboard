<template lang="html">
  <div class="home">

    <div v-if="!connected" class="signin">
      <a v-bind:href="connect_url">
        <img src="src/assets/octocat_1.png" alt="">
        <p class=""><i class="fa fa-github" aria-hidden="true"></i> Sign in with GitHub</p>
      </a>
    </div>

    <div v-else class="connected">
      <h2>Welcome</h2>

      <div class="top">
        <v-me></v-me>
        <v-orgas></v-orgas>
        <v-bulle :color="'#0180C7'" :text="'Public Repo'" :value="me.public_repos"></v-bulle>
        <v-bulle :color="'#000'" :text="'Private Repo'" :value="me.total_private_repos"></v-bulle>
      </div>



      <div class="middle">

        <v-events :username="me.login"></v-events>

        <div class="trends">
          <v-trend :username="me.login" :trend="'all'" :title="'Activities Trends'"></v-trend>
          <v-trend :username="me.login" :trend="'commit'" :title="'Commits Trends'"></v-trend>
        </div>

        <div class="stats">
          <v-bulle :color="'#0180C7'" :text="'Followers'" :value="me.followers"></v-bulle>
          <v-bulle :color="'#35495e'" :text="'Following'" :value="me.following"></v-bulle>
          <v-bulle :color="'#FF0057'" :text="'Public Gist'" :value="me.public_gists"></v-bulle>
          <v-bulle :color="'#42B983'" :text="'Private Gist'" :value="me.private_gists"></v-bulle>
          <v-bulle :color="'#bfe624'" :text="'Stars'" :value="stars"></v-bulle>
          <v-bulle class="disk" :color="'#d8d0d0'" :text="'Disk Space'" :value="space(me.disk_usage)"></v-bulle>
        </div>

      </div>

      <v-quota v-if="meta" :meta="meta"></v-quota>
    </div>

  </div>
</template>

<script>

import auth from '../auth'
import env from 'env'
import moment from 'moment'
import Quota from './Quota.vue'
import Events from './home/Events.vue'
import Organizations from './home/Organizations.vue'
import Bulle from './home/Bulle.vue'
import Trend from './home/Trend.vue'
import Me from './home/Me.vue'
let parse = require('parse-link-header')

export default {
  name: 'home',
  data () {
    return {
      progress: true,
      connected: auth.checkAuth(),
      me: null,
      meta: null,
      connect_url: '/auth/github',
      stars: 0
    }
  },
  components: {
    'v-me': Me,
    'v-quota': Quota,
    'v-events': Events,
    'v-bulle': Bulle,
    'v-trend': Trend,
    'v-orgas': Organizations
  },
  created(){
    this.connect_url = env.api+this.connect_url

    if(this.gup('token')){
      localStorage.setItem('token', this.gup('token'))
      this.connected = auth.checkAuth()
      this.$http.get(env.api+'/me'+auth.urlToken()).then(response => {
        localStorage.setItem('me', JSON.stringify(response.body.data))
        window.location.href = '/'
      })
    }
    if(auth.checkAuth()) this.me = JSON.parse(localStorage.getItem('me'))
    this.getTotalStars()
  },
  methods:{
    space(int){
      return (int / 1000).toFixed(1)
    },
    gup( name )
    {
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( window.location.href );
      if( results == null )
      return "";
      else
      return results[1];
    },
    getTotalStars(){
      this.$http.get(env.api+'/stars'+auth.urlToken()+'&per_page=1').then(response => {
        let parsed = parse(response.body.meta.link)
        this.stars = parsed.last.page
        this.meta = response.body.meta;
      })
    }
  }
}
</script>

<style lang="scss">

.row{
  margin: 0;
  padding: 0;
}

.top{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 800px) {
    justify-content: space-around;
  }
}

.middle{
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1300px) {
    flex-wrap: wrap;
  }
  .events{
    @media screen and (max-width: 1300px) {
      width: 45%!important;
    }
    @media screen and (max-width: 800px) {
      width: 100%!important;
    }
  }
  .trends{
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0px 20px;
    @media screen and (max-width: 1300px) {
      padding: 0px;
      width: 45%;
    }
    @media screen and (max-width: 800px) {
      width: 100%!important;
      margin-top: 20px;
    }
  }
  .stats{
    display: flex;
    flex-wrap: wrap;
    min-width: 280px;
    max-width: 300px;
    justify-content: space-between;
    @media screen and (max-width: 1300px) {
      min-width: 100%;
      margin-top: 20px;
    }
  }
}

.signin{
  width: 300px;
  margin: auto;
  position: absolute;
  background: white;
  padding: 20px;
  left: 50%;
  margin-left: -170px;
  top: 25%;
  border-radius: 10px;

  img{
    height:150px;
  }
  
  a{
    color: black;

    p{
      border: 2px solid;
      border-radius: 20px;
      font-size: 17px;
      padding: 5px;
      transition: all 0.2s
    }

    &:hover{
      p{
        //transform: translateY(10px);
      }
    }
  }
}

.connected{
  padding: 2%;
}


</style>
