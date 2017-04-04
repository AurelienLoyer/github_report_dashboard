<template lang="html">
  <div>
    <h2>{{title}}</h2>

    <ul class="repos" v-if="!progress">
      <li v-for="repo in repos">
        <v-repo :repo="repo"></v-repo>
      </li>
      <li class="scrollLoader" v-if="scrollLoader">
        Loading more...
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

import env from 'env'
import auth from '../../auth'
import Quota from '../Quota.vue'
import Loader from '../Loader.vue'
import Repo from './Repo.vue'

export default {
  name: 'repos-list',
  data () {
    return {
      repos: [],
      meta: null,
      token: localStorage.getItem('token'),
      progress: true,
      lastPage: 1,
      infiniteScroll: true,
      scrollLoader:false,
    }
  },
  props: [
    'title',
    'url'
  ],
  components: {
    'v-quota':Quota,
    'v-loader':Loader,
    'v-repo':Repo
  },
  created(){

    window.addEventListener('scroll', this.handleScroll);

    this.$http.get(env.api+'/'+this.url+auth.urlToken()+'&per_page=8').then(response => {
      this.repos = response.body.data
      this.meta = response.body.meta
      this.progress = false
      if(!response.body.next) this.infiniteScroll = false
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods:{
    handleScroll () {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        if(this.infiniteScroll) this.endScroll()
      }
    },
    endScroll() {
      this.lastPage++
      this.scrollLoader = true
      this.infiniteScroll = false
      this.$http.get(env.api+'/'+this.url+auth.urlToken()+'&per_page=8&page='+this.lastPage).then(response => {
        this.repos = this.repos.concat(response.body.data)
        this.meta = response.body.meta
        this.scrollLoader = false
        this.infiniteScroll = true
        if(!response.body.next) this.infiniteScroll = false
      })
    }
  }

}
</script>

<style lang="scss">

  .repos{
    text-align: left;
    width: 1000px;
    margin: auto;
    max-width: 100%;
    padding-bottom: 100px;
  }

  .scrollLoader{
    height: 50px;
    background: #2EC18E;
    animation-name: spaceboots;
    animation-duration: 0.8s;
    transform-origin: 50% 50%;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-transform: uppercase;
    width: 300px;
    margin: auto;
    margin-bottom: 30px;
  }

  @-webkit-keyframes spaceboots {
  	0% { -webkit-transform: translate(2px, 1px) rotate(0deg); }
  	10% { -webkit-transform: translate(-1px, -2px) rotate(-1deg); }
  	20% { -webkit-transform: translate(-3px, 0px) rotate(1deg); }
  	30% { -webkit-transform: translate(0px, 2px) rotate(0deg); }
  	40% { -webkit-transform: translate(1px, -1px) rotate(1deg); }
  	50% { -webkit-transform: translate(-1px, 2px) rotate(-1deg); }
  	60% { -webkit-transform: translate(-3px, 1px) rotate(0deg); }
  	70% { -webkit-transform: translate(2px, 1px) rotate(-1deg); }
  	80% { -webkit-transform: translate(-1px, -1px) rotate(1deg); }
  	90% { -webkit-transform: translate(2px, 2px) rotate(0deg); }
  	100% { -webkit-transform: translate(1px, -2px) rotate(-1deg); }
  }

</style>
