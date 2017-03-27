<template lang="html">
  <div>
    <h2>Repos</h2>

    <ul class="repos" v-if="!progress">
      <li v-for="repo in repos">
        <v-repo :repo="repo"></v-repo>
      </li>
    </ul>
    <div v-if="repos.length === 0 && !progress" class="">
      -----
    </div>

    <v-loader v-if="progress"></v-loader>
    <v-quota v-if="meta" :meta="meta"></v-quota>

  </div>
</template>

<script>

import env from '../env'
import auth from '../auth'
import Quota from './Quota.vue'
import Loader from './Loader.vue'
import Repo from './item/Repo.vue'

export default {
  name: 'repos',
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
    'v-loader':Loader,
    'v-repo':Repo
  },
  created(){
    this.$http.get(env.api+'/repos'+auth.urlToken()).then(response => {
      this.repos = response.body.data
      console.log(this.repos)
      this.meta = response.body.meta
      this.progress = false
    })
  },
  methods:{

  }

}
</script>

<style lang="scss">

  .repos{
    text-align: left;
    width: 1000px;
    margin: auto;
    max-width: 100%;
  }

</style>
