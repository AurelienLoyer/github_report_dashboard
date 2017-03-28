<template lang="html">
  <div class="me">

    <a @click="logout()" class="button">LOGOUT</a>

  </div>
</template>

<script>
import auth from '../auth'
import env from 'env'

export default {
  name: 'me',
  data () {
    return {
      progress: true,
      connected: auth.checkAuth(),
      me: null,
      connect_url: '/auth/github',
    }
  },
  created(){
    if(auth.checkAuth())(
      this.me = JSON.parse(localStorage.getItem('me'))
    )
  },
  methods:{
    logout()
    {
      auth.logout()
    }
  }
}
</script>


<style lang="scss" scoped>
.me{
  text-align: center;
  margin: 20px auto;
  padding-top: 20px;
  a{
    cursor: pointer;
  }
}
</style>
