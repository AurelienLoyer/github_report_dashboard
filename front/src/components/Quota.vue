<template lang="html">
  <div class="quota">
    {{meta['x-ratelimit-remaining']}} / {{meta['x-ratelimit-limit']}}
  </div>
</template>

<script>


export default {
  name: 'quota',
  data () {
    return {

    }
  },
  props: ['meta'],
  created(){

  },
  methods:{

  }
}
</script>


<style lang="scss">
.quota{
  position: fixed;
  border: none;
  color: white;
  background: #FF0057;
  padding: 15px 20px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  left: 10px;
  bottom: 10px;
}
</style>
