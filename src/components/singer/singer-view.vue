<template>
  <div class="main">
    <singer @toSingerDetail="toDetail" class="singer"></singer>
<!--    <singer-detail></singer-detail>-->
<!--    <router-view></router-view>-->
  </div>
</template>

<script>
  import singer from '../../components/singer/singer'
  import SingerDetail from "./singer-son/singerDetail";
  export default {
    name: "singer-view",
    components:{
      SingerDetail,
      singer
    },
    methods:{
      toDetail(item){
        // console.log(item)
        this.$router.push('/singer/' + item.singerID)
        // console.log('-')
      }
    }
  }
</script>

<style scoped>
</style>
