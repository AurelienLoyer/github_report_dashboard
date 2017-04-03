<template lang="html">
  <div>
    <h2><span v-if="repo.name">{{repo.name}} - </span>Issues</h2>

    <div class="filters" v-if="!repo.name">
      <div class="filter">
        Owned
        <label class="switch">
          <input type="checkbox" v-model="owned">
          <div class="slider round"></div>
        </label>
      </div>
      <div class="filter">
        Starred
        <label class="switch">
          <input type="checkbox" v-model="starred">
          <div class="slider round"></div>
        </label>
      </div>
    </div>

    <div v-if="issues.length && 0" class="infos">
      <span>{{issues.length}} issues </span>
      <span v-if="!repo.name"> 19 repository</span>
    </div>

    <ul class="issues">
      <li v-for="issue in issues" v-if="filter(issue)">
        <div class="repo_name" v-if="issue.repo">
          {{issue.repo.name}}
          <em>
            ( <strong>{{issue.nbtotal}}</strong>
            issue<span v-if="issue.nbtotal> 1">s</span>
            <span v-if="issue.nbtotal >= 30"> and maybe more...</span>)
          </em>
        </div>
        <v-issue :issue="issue"></v-issue>
      </li>
      <li v-if="issues.length === 0 && !progress" class="no_issue">
        No issue
      </li>
      <li v-if="progress">
        <v-loader v-if="progress"></v-loader>
      </li>
    </ul>

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
      progress: false,
      repo: {},
      starred: false,
      owned: true,
    }
  },
  components: {
    'v-quota':Quota,
    'v-loader':Loader,
    'v-issue':Issue,
  },
  created(){

    if(this.$route.params.name){
      this.getIssuesForRepo()
    }else{
      this.getIssuesForStarred()
      this.getIssuesForOwned()
    }

  },
  methods:{
    filter(issue){
      if(this.repo.name)
        return true
      if(this.starred && issue.isStarred)
        return true
      if(this.owned && issue.isOwned)
        return true
      else
        return false
    },
    getIssuesForRepo(){
      let repo_params = ''
      this.progress = true
      this.repo.name = this.$route.params.name
      this.repo.owner = this.$route.params.owner
      repo_params = '&repo='+this.repo.name+'&owner='+this.repo.owner
      this.$http.get(env.api+'/issues'+auth.urlToken()+repo_params).then(response => {
        if(!response.body.data) return
        response.body.data.map(issue => {
          console.log(response.body.data.length)
          issue.nbtotal = response.body.data.length
          this.issues.push(issue)
        })
        this.meta = response.body.meta
        this.progress = false
      })
    },
    getIssuesForStarred(){
      this.$http.get(env.api+'/stars'+auth.urlToken()).then(response => {
        this.meta = response.body.meta
        response.body.data.map(repo => {
          let repo_params = ''
          repo_params = '&repo='+repo.name+'&owner='+repo.owner.login
          this.$http.get(env.api+'/issues'+auth.urlToken()+repo_params).then(response => {
            if(!response.body.data) return
            let index = 0
            response.body.data.map(issue => {
              if(index === 0) issue.repo = repo
              issue.isStarred = true
              console.log(response.body.data.length)
              issue.nbtotal = response.body.data.length
              this.issues.push(issue)
              index++
            })
            this.meta = response.body.meta
          })
        })
      })
    },
    getIssuesForOwned(){
      this.$http.get(env.api+'/repos'+auth.urlToken()).then(response => {
        this.meta = response.body.meta
        response.body.data.map(repo => {
          let repo_params = ''
          repo_params = '&repo='+repo.name+'&owner='+repo.owner.login
          this.$http.get(env.api+'/issues'+auth.urlToken()+repo_params).then(response => {
            if(!response.body.data) return
            let index = 0
            response.body.data.map(issue => {
              if(index === 0) issue.repo = repo
              issue.isOwned = true
              issue.nbtotal = response.body.data.length
              this.issues.push(issue)
              index++
            })
            this.meta = response.body.meta
          })
        })
      })
    }
  }

}
</script>

<style lang="scss">

.issues{
  text-align: left;
  width: 1000px;
  margin: auto;
  max-width: 100%;

  li{
    margin: 0;
  }

  .no_issue{
    background: white;
    padding: 20px;
    font-weight: bold;
    text-align: center;
  }

  blockquote{
    margin: 2em 0;
    padding-left: 20px;
    border-left: 4px solid #42b983;
  }

  .repo_name{
    display: block;
    text-align: left;
    margin: auto;
    padding: 15px;
    font-size: 1.5em;
    color: #475766;
    padding-left: 0px;
    text-transform: uppercase;
    em{
      font-size: 12px;
    }
  }
}

.filters{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: white;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
  max-width: 1000px;
  width: 90%;
  margin: 30px auto;

  .filter{
    margin: 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
    label{
      margin-left: 10px;
    }
  }
}

</style>
