<template lang="html">
  <div class="trend">
    <h3>{{title}}</h3>
    <trend
      :data="count"
      :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
      auto-draw
      :auto-draw-duration="3000"
      smooth
      v-if="!progress">
    </trend>
    <v-loader v-if="progress"></v-loader>
  </div>

</template>

<script>


import auth from '../../auth'
import env from 'env'
import Loader from '../Loader.vue'
import moment from 'moment'

export default {
  name: 'events',
  data () {
    return {
      events:[],
      progress: false,
      count : [],
    }
  },
  components: {
    'v-loader':Loader,
  },
  props: [
    'username',
    'title',
    'trend'
  ],
  created(){
    this.progress = true
    this.$http.get(env.api+'/events'+auth.urlToken()+'&username='+this.username).then(response => {
      let test = {}
      response.body.data.map(event => {
        if(this.trend === 'commit'){
          if(event.type === 'PushEvent' && event.payload.commits.length){
            let array_key = moment(event.created_at).format('YYYY-MM-DD')
            if(typeof test[array_key] === 'undefined') test[array_key] = 0
            test[array_key] += event.payload.commits.length
          }
        }else{
          let array_key = moment(event.created_at).format('YYYY-MM-DD')
          if(typeof test[array_key] === 'undefined') test[array_key] = 1
          else test[array_key]++
        }

      })
      Object.keys(test).map(key => {
        this.count.push(test[key])
      })
      this.progress = false;
    })
  },
  methods:{

  }
}
</script>
<style lang="scss">
.trend{
  .loader{
    img{
      height: 110px !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.trend{
  background: white;
  text-align: left;
  padding: 10px 30px;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
  height: auto;

  svg{
    height: 100%;
    width: 100%;
  }

}
</style>
