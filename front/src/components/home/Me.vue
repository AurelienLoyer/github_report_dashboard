<template lang="html">
  <div v-if="me" class="me">
    <img :src="me.avatar_url" alt="">
    <div class="infos">
      {{me.login}}<br>
      <em>{{me.name}}</em><br>
      <span>Public repo <strong>{{me.public_repos}}</strong></span><br>
      <span>Private repo <strong>{{me.total_private_repos}}</strong></span>
    </div>
  </div>
</template>

<script>

import auth from '../../auth'
import env from 'env'
import Loader from '../Loader.vue'

export default {
  name: 'me',
  data () {
    return {
      progress: false
    }
  },
  components: {
    'v-loader':Loader,
  },
  props: [
  ],
  created(){
    if(auth.checkAuth()) this.me = JSON.parse(localStorage.getItem('me'))
    console.log(this.me)
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>

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

  @media screen and (max-width: 600px) {
    width: 100%!important;
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
