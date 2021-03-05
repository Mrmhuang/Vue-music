<template>
  <div id="app">
      <mheader v-if="componentName"></mheader>
      <tab v-show="componentName"></tab>
      <music></music>
      <keep-alive exclude="music">
        <router-view/>
      </keep-alive>
  </div>
</template>

<script>
  import mheader from "./components/m-header/m-header";
  import tab from './components/tab/tab'
  import music from "./components/music/music";
export default {
  name: 'App',
  components:{
    mheader,
    tab,
    music
  },
  computed:{
    componentName(){
      // console.log(this.$route.name)
      return !(/^singermore$/.test(this.$route.name))
    }
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
  }
</style>
