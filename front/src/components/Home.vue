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

      <div class="toprow">
        <div v-if="me" class="me">
          <img :src="me.avatar_url" alt="">
          <div class="infos">
            {{me.login}}<br>
            <em>{{me.name}}</em><br>
            <span>Public repo <strong>{{me.public_repos}}</strong></span><br>
            <span>Private repo <strong>{{me.total_private_repos}}</strong></span>
          </div>
        </div>

        <v-bulle :color="'#0180C7'" :text="'Public Repo'" :value="me.public_repos"></v-bulle>
        <v-bulle :color="'#000'" :text="'Private Repo'" :value="me.total_private_repos"></v-bulle>

        <v-bulle :color="'#FF0057'" :text="'Public Gist'" :value="me.public_gists"></v-bulle>
        <v-bulle :color="'#42B983'" :text="'Private Gist'" :value="me.private_gists"></v-bulle>

        <v-bulle :color="'#bfe624'" :text="'Followers'" :value="me.followers"></v-bulle>
        <v-bulle :color="'#35495e'" :text="'Following'" :value="me.following"></v-bulle>

        <v-bulle :color="'#d8d0d0'" :text="'Disk Space'" :value="space(me.disk_usage)"></v-bulle>
      </div>

      <v-events :username="me.login"></v-events>

      <v-quota v-if="meta" :meta="meta"></v-quota>
    </div>

  </div>
</template>

<script>

import auth from '../auth'
import env from '../env'
import Quota from './Quota.vue'
import Events from './home/Events.vue'
import Bulle from './home/Bulle.vue'

export default {
  name: 'home',
  data () {
    return {
      progress: true,
      connected: auth.checkAuth(),
      me: null,
      meta: null,
      feeds : [],
      connect_url: '/auth/github'
    }
  },
  components: {
    'v-quota':Quota,
    'v-events':Events,
    'v-bulle':Bulle
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
    if(auth.checkAuth())(
      this.me = JSON.parse(localStorage.getItem('me'))
    )
  },
  methods:{
    space(int){
      return '223'
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
    }
  }
}
</script>

<style lang="scss">

.signin{
  width: 200px;
  max-width: 80%;
  margin: auto;
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

.toprow{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .box{
    margin-left: 20px;
  }
}

.me{
  height: 120px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 300px;
  padding: 10px;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);

  @media screen and (max-width: 400px) {
    width: auto;
  }

  img{
    height:100px;
    width: 100px;
    border-radius: 50%;
    border: 3px solid #42b983;
  }
  .infos{
    text-align: left;
    margin-left: 20px;
  }
}

</style>
