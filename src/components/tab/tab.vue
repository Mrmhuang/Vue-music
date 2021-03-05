<template>
  <div class="content">
<!--    <router-link to="/recommend" tag="div">-->
<!--      <span>推荐</span>-->
<!--    </router-link>-->
<!--    <router-link to="/rank" tag="div">-->
<!--      <span>排行</span>-->
<!--    </router-link>-->
<!--    <router-link to="/singer" tag="div">-->
<!--      <span>歌手</span>-->
<!--    </router-link>-->
    <div v-for="(item,index) in to" @click="changeIndex(index,item)">
      <span :class="{pad:currentIndex==index}" class="title">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tab",
    data(){
      return{
        currentIndex: 0,
        to:[{name:'推荐',r:'/recommend'},{name: '排行',r:'/rank'},{name:'歌手',r:'/singer'}]
      }
    },
    created() {
      // console.log('tab被重建了')
    },
    methods:{
      changeIndex(index,item){
        this.currentIndex = index
        // console.log(item.r)
        this.$router.push(item.r)
      }
    }
  }
</script>

<style scoped>
  .content{
    position: relative;
    z-index: 666;
    height: 42px;
    display: flex;
    color: white;
    background-color: orangered;
  }
  .content div{
    text-align: center;
    height: 42px;
    line-height: 42px;
    width: 33.3%;
  }
  .title{
    padding: 2px 0 2px 0;
  }
  .pad{
    border-bottom: 2px solid white;
  }
</style>
