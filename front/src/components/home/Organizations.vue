<template lang="html">
  <div class="organizations">
    <h3>Organization<span v-if="organizations.length > 1">s</span></h3>
    <ul>
      <li v-if="!progress" v-for="orga in organizations" class="organization">
        <img :src="orga.avatar_url" alt="">
        <span class="name">{{orga.login}}</span>
      </li>
      <li v-if="!progress && organizations.length == 0" class="no_orga">
        <span>No Organization</span>
      </li>
    </ul>
    <v-loader v-if="progress"></v-loader>
  </div>

</template>

<script>

import auth from '../../auth'
import env from 'env'
import Loader from '../Loader.vue'

export default {
  name: 'organizations',
  data () {
    return {
      organizations:[],
      progress: false
    }
  },
  components: {
    'v-loader':Loader,
  },
  props: [
  ],
  created(){
    this.progress = true
    this.$http.get(env.api+'/orgs'+auth.urlToken()).then(response => {
      this.organizations = response.body.data
      this.progress = false
    })
  },
  methods:{

  }
}
</script>

<style lang="scss">
.organizations{
  .loader{
    img{
      height: 65px!important;
    }
  }
}
</style>

<style lang="scss" scoped>

.organizations{
  background: white;
  text-align: left;
  padding: 10px 15px;
  height: 120px;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);

  h3{margin: 0;}

  .organization{
    img{
      height: 50px;
      display: block;
      margin: auto;
    }
    span{
      width: 100%;
      text-align: center;
      display: block;
    }
  }
}

</style>
