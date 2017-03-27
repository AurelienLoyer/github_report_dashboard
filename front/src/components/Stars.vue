<template lang="html">
  <div>
    <h2>Starred Repos</h2>

    <ul class="repos" v-if="!progress">
      <li v-for="repo in repos">
        <blockquote>
          <h3>{{repo.name}}</h3>
          <em>{{repo.description}}</em>
          <span><i class="fa fa-star" aria-hidden="true"></i> {{repo.stargazers_count}}</span>
          <span><i class="fa fa-eye" aria-hidden="true"></i> {{repo.watchers_count}}</span>
          <p class="actions">
            <router-link :to="'/repos/'+repo.owner.login+'/'+repo.name+'/commits'" class="button">COMMITS</router-link>
            <router-link :to="'/repos/'+repo.owner.login+'/'+repo.name+'/issues'" class="button white">ISSUES</router-link>
          </p>
        </blockquote>
      </li>
    </ul>
    <div v-if="repos.length === 0 && !progress" class="">
      -----
    </div>

    <div v-if="progress" class="loader">
      <img src="src/assets/loader3.gif" alt="">
    </div>

    <v-quota v-if="meta" :meta="meta"></v-quota>

  </div>
</template>

<script>

import env from '../env'
import auth from '../auth'
import Quota from './Quota.vue'

export default {
  name: 'stars',
  data () {
    return {
      repos: [],
      meta: null,
      token: localStorage.getItem('token'),
      progress: true
    }
  },
  components: {
    'v-quota':Quota,
  },
  created(){
    this.$http.get(env.api+'/stars'+auth.urlToken()).then(response => {
      this.repos = response.body.data
      this.meta = response.body.meta
      this.progress = false
    })
  },
  methods:{

  }

}
</script>

<style lang="scss">

  .loader{
    img{
      height: 250px;
    }
  }

  .repos{
    text-align: left;
    width: 1000px;
    margin: auto;
    max-width: 100%;

    blockquote{
      margin: 2em 0;
      padding-left: 20px;
      border-left: 4px solid #42b983;
    }
  }

</style>
