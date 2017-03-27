<template lang="html">
  <div class="loader">
    <img src="src/assets/loader3.gif" alt="">
  </div>

</template>

<script>

export default {
  name: 'loader',
  data () {
    return {}
  },
  props: [],
  created(){
  },
  methods:{
  }
}
</script>

<style lang="scss" scoped>
.loader{
  background: white;
  text-align: left;
  padding: 10px 30px;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);

  img{
    height: 250px;
  }

}
</style>
