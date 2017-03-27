<template lang="html">
  <div class="events">
    <h3>Events</h3>
    <ul>
      <li v-for="event in events" class="event">
        <span class="date">{{event.created_at}}</span>
        <span class="type">{{event.type}} on </span>
        <span class="repo">{{event.repo.name}}</span>
      </li>
    </ul>
  </div>

</template>

<script>

import auth from '../auth'
import env from '../env'

export default {
  name: 'events',
  data () {
    return {
      events:[]
    }
  },
  props: [
    'username'
  ],
  created(){
    this.$http.get(env.api+'/events'+auth.urlToken()+'&username='+this.username).then(response => {
      this.events = response.body.data
    })
  },
  methods:{
  }
}
</script>

<style lang="scss" scoped>
.events{
  background: white;
  text-align: left;
  padding: 15px;
  ul{
    margin: 0;
    padding: 0;
    max-height: 400px;
    overflow-y: scroll;
  }
  .event{
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 25px 0;
    border-bottom: 2px solid grey;

    .date{
      color: grey;
      margin-right: 50px;
    }
    .type{
      font-weight: bold;
      margin-right: 10px;
    }
    .repo{

    }
  }

}
</style>
