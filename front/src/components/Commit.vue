<template lang="html">
  <div>
    <h3>{{branch}}</h3>
      <ul>
        <li v-for="data in commits">
          {{data.commit.message}}
        </li>
      </ul>
      <div v-if="commits && commits.length === 0">
        -----
      </div>
    </div>
</template>

<script>

export default {
    props: ['commits', 'branch']
}
</script>

<style lang="scss">
</style>
