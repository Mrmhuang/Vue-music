<template>
  <div class="content clearfix" ref="content">
    <div class="title">推荐歌单</div>
    <div v-if="this.result.length!==0" class="content">
      <div v-for="item in this.result" class="content-item" @click="toDetail(item)">
          <img v-lazy="item.picUrl" alt="#" @load="imageload">
          <div class="span">
            <span>{{item.name}}</span>
          </div>
      </div>
      <div class="content-item chengkai">
      </div>
    </div>
    <loading v-show="!this.result.length"></loading>

  </div>
</template>

<script>
  import {getRecommendSongs} from "../../../network/recommend";
  import loading from "../../../baseComponent/loading/loading";
  //引用关于mixin的js
  import {addScrollHeight} from "../../../mixin/mixin";
  export default {
    name: "songs",
    data(){
      return {
        recommendSongs:{},
        result:[]
      }
    },
    mixins:[addScrollHeight],
    components:{
      loading
    },
    mounted() {
      setTimeout(()=>{
        this.getRecommend_Songs()
      },20)
    },
    methods:{
      getRecommend_Songs(){
        getRecommendSongs().then(res=>{
          this.recommendSongs = res
          this.result = this.recommendSongs.data.result
          console.log(this.recommendSongs)
        })
      },
      imageload(){
        this.$emit('imageLoad')
      },
      addBottom(){
        this.$refs.content.style.bottom = 22+'px'
      },
      toDetail(item){
        console.log(item)
        this.$router.push({
          path:'/recommend',
          query:{
            id:item.id
          }
        })
      }
    }
  }
</script>

<style scoped>
  img{
    width: 100%;
  }
  .chengkai{
    height: 280px;   /* 加上了浮动 然后才撑开了 */
  }
  .content-item{
    float: left;
    width: 28%;
    margin-left: 4%;
  }
  .content-item .span{
    height: 50px;
    overflow: hidden;
  }
  .content-item span{
    font-size: 12px;
  }
  .title{
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    text-indent: 15px;
  }

  /*清除浮动*/
  .clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
    content: "";
    display: block;
    height: 0;
    clear:both;
    visibility: hidden;
  }
  .clearfix{
    *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
  }
</style>
