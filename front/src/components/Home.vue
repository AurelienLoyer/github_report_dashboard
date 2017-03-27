<template lang="html">
  <div class="home">
    <h2>Welcome</h2>

    <div v-if="me" class="me">

      <img :src="me.avatar_url" alt="">
      <div class="infos">
        {{me.login}}<br>
        <em>{{me.name}}</em><br>
        <span>Public repo <strong>{{me.public_repos}}</strong></span><br>
        <span>Private repo <strong>{{me.total_private_repos}}</strong></span>
      </div>

    </div>

    <div v-if="!connected" class="signin">
      <a v-bind:href="connect_url">
        <img src="src/assets/octocat_1.png" alt="">
        <p class=""><i class="fa fa-github" aria-hidden="true"></i> Sign in with GitHub</p>
      </a>
    </div>

    <v-quota v-if="meta" :meta="meta"></v-quota>

  </div>
</template>

<script>

import auth from '../auth'
import env from '../env'
import Quota from './Quota.vue'

export default {
  name: 'home',
  data () {
    return {
      progress: true,
      connected: auth.checkAuth(),
      me: null,
      meta: null,
      connect_url: '/auth/github',
    }
  },
  components: {
    'v-quota':Quota
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

.me{
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    height:100px;
  }
  .infos{
    text-align: left;
    margin-left: 20px;
  }
}

</style>
