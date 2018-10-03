<template lang="html">
  <blockquote>
    <h3 v-if="issue.repository">{{issue.repository.name}}</h3>
    <h4>{{issue.title}}</h4>
    <em v-html="marked(issue.body)"></em>
    <div class="labels">
      <span class="label-item" v-for="(label,index) in issue.labels" :key="`label-${index}`">
        {{ label.name }} 
        <span class="label-color" :style="`background-color:#${label.color}`"></span>
      </span>
    </div>
    <a class="leftlink" :href="issue.html_url" target="_blank">
      <i class="fa fa-link" aria-hidden="true"></i>
      <span>view</span>
      <span>on</span>
      <i class="fa fa-github" aria-hidden="true"></i>
    </a>
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
  position: relative;
  overflow: hidden;

  h3{
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
  }

  img{
    display: block;
    max-width: 100%;
  }

  &:hover{
    .leftlink{
      right: 0;
    }
  }

  .leftlink{
    transition: all 0.2s;
    position: absolute;
    right: -50px;
    height: 100%;
    background: #42b983;
    color: white;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    .fa-link{
      margin-bottom: 10px;
    }
    span{
      transform: rotate(90deg);
      display: block;
      padding: 5px 0px;
      padding-bottom: 9px;
      font-weight: 700;
    }
  }

  .labels {

  }
  
  .label-item {
    color: white;
    background: #42b983;
    font-weight: 500;
    padding: 2px 5px;
    display: inline-block;
    margin: 0 10px 5px 0;
    border-radius: 4px;
  }

  .label-color {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin: 0 10px;
  } 
}

</style>
