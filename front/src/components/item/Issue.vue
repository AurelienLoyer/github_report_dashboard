<template lang="html">
  <blockquote>
    <h3 v-if="issue.repository">{{issue.repository.name}}</h3>
    <h4>{{issue.title}}</h4>
    <em v-html="marked(issue.body)"></em>
  </blockquote>
</template>

<script>

let marked = require('marked');

export default {
  name: 'repo-issue',
  data () {
    return {
    }
  },
  components: {
  },
  props: [
    'issue'
  ],
  created(){
  },
  methods:{
    marked(string){
      return marked(string)
    }
  }
}
</script>

<style lang="scss">

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
  h4{

  }

  img{
    display: block;
    max-width: 100%;
  }

}

</style>
