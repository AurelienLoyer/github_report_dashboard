<template lang="html">
  <div>
    <v-reposlist :url="'stars'" :title="'Starred Repos'"></v-reposlist>
  </div>
</template>

<script>

import ReposList from './item/ReposList.vue'

export default {
  name: 'stars',
  data () {
    return {
    }
  },
  components: {
    'v-reposlist' : ReposList
  },
  created(){
  },
  methods:{
  }
}
</script>

<style lang="scss">

</style>
