<template lang="html">
  <div>
    <h3 class="branch_name">{{branch}}</h3>
      <ul class="commits">
        <li v-for="data in commits" class="commit">
          {{data.commit.message}}
        </li>
        <li class="no_commit" v-if="!commits || commits.length === 0">No commit</li>
      </ul>
    </div>
</template>

<script>

export default {
    props: ['commits', 'branch']
}
</script>

<style lang="scss" scoped>
.branch_name{
  font-size: 1em;
  text-transform: uppercase;
}
.commits{
  background: white;
  width: 100%;
  margin: auto;
  text-align: left;
  padding: 10px 0;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);

  .commit{
    margin: 10px 20px;
  }
  .no_commit{
    text-align: center;
  }
}
</style>
