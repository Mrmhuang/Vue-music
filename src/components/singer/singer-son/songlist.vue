<template>
  <div v-if="songs.length>0 && singerName!==undefined" content="main" class="main">
    <p class="all"><i class="iconfont icon-bofang"></i> 播放全部</p>
    <ul>
      <li v-for="(item,index) in songs" @click="toDetail(index)">
        <div class="content">
          <div class="left">{{index+1}}</div>
          <div class="right">
            <p class="song_name">{{item.al.name}}</p>
            <p class="singer_name">{{singerName}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="kongbai"></div>
  </div>
</template>

<script>
  import {mapMutations} from "vuex";

  export default {
    name: "songlist",
    props:{
      songs:{
        type:Array,
        defalt:[]
      },
      singerName:{
        type:String,
        default:undefined
      }
    },
    data(){
      return {
        index:0
      }
    },
    methods:{
      ...mapMutations([
        'SetCurrentSongName',
        'SetCurrentSingerName',
        'SetCurrentSongPic'
      ]),
      toDetail(index){
        // this.index = index
        // new Promise((resolve,reject)=>{
          this.$emit('toMusic',index)
          // resolve();
        // }).then(()=>{
        //
        // })
      }
    }
  }
</script>

<style scoped>
  @import "../../../../src/common/fonts/font3/iconfont.css";
  .main{
    border-radius: 25px;
    background-color: white;
  }
  .all{
    height: 60px;
    line-height: 60px;
    text-indent: calc(10%);
    font-size: 17px;
    font-weight: 100;
  }
  .all i{
    font-size: 18px;
    font-weight: bold;
  }
  .content{
    height: 50px;
    width: 100vw;
    padding: 5px 0 5px 0;
    border-top: 1px solid darkgrey;
  }
  li{
    height: 60px;
  }
  .content div{
    float: left;
  }
  .content p{
    height: 25%;
  }
  .left{
    line-height: 50px;
    width: 20vw;
    text-align: center;
    font-size: 14px;
  }
  .right{
    width: 80vw;
    line-height: 25px;
  }
  .song_name{
    font-weight: 500;
    color: black;
  }
  .singer_name{
    font-size: 13px;
    color: gray;
  }
  .kongbai{
    height: 350px;
  }
  /*!*清除浮动*!*/
  /*.clearfix:after{!*伪元素是行内元素 正常浏览器清除浮动方法*!*/
  /*  content: "";*/
  /*  display: block;*/
  /*  height: 0;*/
  /*  clear:both;*/
  /*  visibility: hidden;*/
  /*}*/
  /*.clearfix{*/
  /*  *zoom: 1;!*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*!*/
  /*}*/
</style>
