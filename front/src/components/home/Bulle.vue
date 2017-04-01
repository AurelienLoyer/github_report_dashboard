<template lang="html">
  <div class="box">
    <div class="bulle" :style="{ 'background': color }">
      {{value}}
      <span class="unit">(mo)</span>
    </div>
    <span>{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'bulle',
  data () {
    return {
    }
  },
  components: {
  },
  props: [
    'color',
    'value',
    'text'
  ],
  created(){
  },
  methods:{
  }
}
</script>

<style scoped lang="scss">

.box{
  background: white;
  margin-bottom: 20px;
  width: 100px;
  padding: 10px;
  height: 120px;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &.disk{
    .bulle{
      font-size: 20px!important;
      font-weight: 500;
      position: relative;
      .unit{
        display: block;
      }
    }
  }
  .bulle{
    .unit{
      display: none;
    }
    height: 70px;
    width: 70px;
    text-align: center;
    background: #0180C7;
    color: white;
    line-height: 70px;
    font-size: 30px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  span{
    font-weight: 500;
  }
}

</style>
