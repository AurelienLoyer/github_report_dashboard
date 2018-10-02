<template lang="html">
  <blockquote>
    <h3><i v-if="repo.fork" class="fa fa-code-fork" aria-hidden="true"></i> {{repo.name}}</h3>
    <em>{{repo.description}}</em>

    <div class="footer">
      <p class="stats">
        <span><i class="fa fa-star" aria-hidden="true"></i> {{repo.stargazers_count}}</span>
        <span><i class="fa fa-eye" aria-hidden="true"></i> {{repo.subscribers_count}}</span>
        <span><i class="fa fa-code-fork" aria-hidden="true"></i> {{repo.forks_count}}</span>
      </p>
      <p class="actions">
        <router-link :to="'/repos/'+repo.owner.login+'/'+repo.name+'/commits'" class="button">COMMITS</router-link>
        <router-link :to="'/repos/'+repo.owner.login+'/'+repo.name+'/issues'" class="button white">ISSUES</router-link>
      </p>
    </div>
  </blockquote>
</template>

<script>

export default {
  name: 'repo-item',
  data () {
    return {
    }
  },
  components: {
  },
  props: [
    'repo'
  ],
  created(){
  },
  methods:{
  }
}
</script>

<style scoped lang="scss">

blockquote{
  margin: 2em 0;
  padding-left: 20px;
  border-left: 4px solid #42b983;
  background: white;
  padding: 10px 20px;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
  h3{
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
  }
  p{
    margin: 0;
    padding: 0;
  }
  .footer{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding-top: 10px;
    .stats{
      span{
        display: inline-flex;
        align-items: center;
        margin-right: 20px;
      }
      .fa{
        margin-right: 10px;
        font-size: 30px;
      }
    }
    .actions{
      display: inline-block;
      text-align: right
    }
  }
}

</style>
