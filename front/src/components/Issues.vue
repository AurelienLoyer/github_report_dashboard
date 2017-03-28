<template lang="html">
  <div>
    <h2><span v-if="repo.name">{{repo.name}} - </span>Issues</h2>

    <div v-if="issues.length" class="infos">
      {{issues.length}} issues <br>

    </div>

    <ul class="issues" v-if="!progress">
      <li v-for="issue in issues">
        <v-issue :issue="issue"></v-issue>
      </li>
      <li v-if="issues.length === 0 && !progress" class="no_issue">
        -----
      </li>
    </ul>

    <v-loader v-if="progress"></v-loader>

    <v-quota v-if="meta" :meta="meta"></v-quota>


  </div>
</template>

<script>

import env from 'env'
import auth from '../auth'
import Quota from './Quota.vue'
import Loader from './Loader.vue'
import Issue from './item/Issue.vue'

export default {
  name: 'repos',
  data () {
    return {
      issues: [],
      meta: null,
      token: localStorage.getItem('token'),
      progress: true,
      repo: {}
    }
  },
  components: {
    'v-quota':Quota,
    'v-loader':Loader,
    'v-issue':Issue,
  },
  created(){

    let repo_params = ''
    if(this.$route.params.name ){
      this.repo.name = this.$route.params.name
      this.repo.owner = this.$route.params.owner
      repo_params = '&repo='+this.repo.name+'&owner='+this.repo.owner
    }

    this.$http.get(env.api+'/issues'+auth.urlToken()+repo_params).then(response => {
      if(response.body.data) this.issues = response.body.data
      console.log(this.issues)
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

  .issues{
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
