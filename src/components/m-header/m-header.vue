<template>
  <div class="content">
    <router-link to="/"><i class="iconfont icon-fenlei-"></i></router-link>
    <span class="title">Hmusic</span>
    <router-link to="/"><i class="iconfont icon-sousuo"></i></router-link>
  </div>
</template>

<script>
  export default {
    name: "m-header"
  }
</script>

<style scoped>
  @import '../../common/fonts/font1/iconfont.css';
  .content{
    position: relative;
    height: 42px;
    line-height: 42px;
    background-color: orangered;
    text-align: center;
    z-index: 666;
  }
  .title{
    font-size: 18px;
    font-weight: bold;
    color: white;
  }
  .iconfont{
    font-size: 20px;
    color: white;
  }
  .icon-sousuo{
    position: absolute;
    right: 10px;
  }
  .icon-fenlei-{
    position: absolute;
    left: 10px;
  }
</style>
