<template lang="html">
  <div>
    <v-reposlist :url="'repos'" :title="'Repos'"></v-reposlist>
  </div>
</template>

<script>

import ReposList from './item/ReposList.vue'

export default {
  name: 'repos',
  data () {
    return {
    }
  },
  components: {
    'v-reposlist' : ReposList
  },
  created(){
  },
  destroyed () {
  },
  methods:{
  }
}
</script>

<style lang="scss">
</style>
