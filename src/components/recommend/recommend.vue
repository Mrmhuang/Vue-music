<template>
  <div class="main">
    <btscroll ref="BTscroll" class="content"> <!-- :data="this.$refs.song" -->
    <div v-if="this.recommend.length!=0" ref="basic">
          <slider>
            <div v-for="(item,index) in this.recommend.data.data" class="needclick">  <!-- 防止事件冲突 -->
              <a :href="item.url"><img :src="item.pic" alt="图片"></a>
            </div>
          </slider>
      <songs @imageLoad="ToRefresh" ref="song"></songs>
    </div>
<!--      <router-link :to="{path: '/recommend', query: {id:123}}">123312</router-link>-->
    </btscroll>
    <router-view/>
  </div>
</template>

<script>
  import slider from "../../baseComponent/slider/slider";
  import {getRecommed} from "../../network/recommend";

  //引用的组件
  import songs from "./recommend_son/songs";
  import btscroll from "../../baseComponent/scroll/btscroll";

  export default {
    name: "recommend",
    data(){
      return {
        recommend:[],
        pic:null
      }
    },
    components:{
      slider,
      songs,
      btscroll
    },
    mounted() {
      this.get_Recommend()
    },
    methods:{
      get_Recommend(){
        getRecommed().then(res => {
          this.recommend = res
        })
      },
      // toURL(url){
      //   this.$router.push(url)
      //   console.log(url)
      // },
      ToRefresh(){
        this.$refs.BTscroll.refresh()
        // console.log('123')
      }
    }
  }
</script>

<style scoped>
  .main{
    height: 100vh;
  }
  .content{
    height: calc(100% - 84px);
    position: relative;
  }
</style>
