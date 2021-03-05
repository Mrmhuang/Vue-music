<template>
  <div class="content">
      <div class="tab_content" ref="tab_c">
        <i class="iconfont icon-zuo" @click="goback"></i>
        <span class="name">{{singer}} <span class="singername">{{singer_name}}</span></span>
      </div>
      <div class="contain" ref="contain"></div>

    <div v-if="this.singerPic.length!==0" class="singerimg" ref="titlepic">
      <img :src="singerPic[this.getCurrentSinger]" alt="图片" @load="toRefresh">
    </div>
    <div ref="list"></div>
      <loading v-if="!this.songs.length>0"></loading>
    <btscroll class="scroll_height" ref="btscroll" :position="true" @position="getPosition">
      <div class="singer_name">{{singerName}}</div>
      <div class="clearfix">  <!-- 在better-scroll的下一个元素中清除浮动 -->
        <div v-if="this.songs.length>0">
          <songlist :songs="this.songs" :singerName="singerName" @toMusic="getMusic"></songlist>
        </div>
      </div>
    </btscroll>
  </div>
</template>

<script>
  import btscroll from "../../../baseComponent/scroll/btscroll";
  import {getSingerSongs} from "../../../network/recommend";
  import {mapGetters,mapActions} from "vuex";
  import songlist from "./songlist";
  import loading from "../../../baseComponent/loading/loading";
  import {perfixStyle} from "../../../api/testWeb/testWeb";
  import {getLyric} from "../../../network/music";

  // import Lyric from 'lyric-parser' //关于歌词

  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  Vue.use(VueAxios, axios)

  const Transform = perfixStyle('transform')

  export default {
    name: "singerDetail",
    data(){
      return {
        Data:null,
        singer:'歌手',
        singerName:'',
        singer_name:'',
        singerNameid:0,
        songs:[],
        singerPic:[],
        index:0,
        lyric:''
      }
    },
    // props:{
    //
    // },
    created() {
      setTimeout(()=>{
        this._getSingerSongs()
        this.singerPic = this.getSingerPic
        this.$refs.btscroll.refresh()
        // console.log(this.singerPic)
      },20)
    },
    mounted() {
      // console.log(this.$route.params.id)
      setTimeout(()=>{
        if(this.$refs.btscroll!==null)
        this.$refs.btscroll.refresh()
      },300)
    },
    methods:{
      ...mapActions([
        'allMutationsInSingerDetail'
      ]),
      _getSingerSongs(){
        getSingerSongs(this.$route.params.id).then(res=>{
          console.log(res)
          this.Data = res
          let singerName = res.data.songs[0].ar[0].name
          let singerid = this.$route.params.id
          let songs = res.data.songs
          let url = 'http://localhost:3000/song/url?id='
          for(let i=0;i<songs.length;i++){
            let songUrl = url + songs[i].id
            // console.log(songUrl)
            Vue.axios.get(songUrl).then(res=>{
              // console.log(res.data.data[0].url)
              songs[i].al.songUrl = res.data.data[0].url
            })
          }
          this.singerName = singerName
          this.singerNameid = singerid
          this.songs = songs
          console.log(this.singerName)
          console.log(this.singerNameid)
          console.log(this.songs)
        })
      },
      goback(){
        console.log('回到上一页')
        this.$router.go(-1)
      },
      toRefresh(){
        this.$refs.btscroll.refresh()
        // console.log(this.$refs.btscroll.refresh)
      },
      getPosition(pos){
        let pageY = -pos.y
        if(pageY>0){
          // this.$refs.tab_c.style.zIndex = '1'
          this.$refs.contain.style.zIndex =1
          // console.log(this.$refs.list.offsetTop)
          if(pageY > this.$refs.list.offsetTop -42){
            this.singer_name = this.singerName
          }else {
            this.singer_name = ''
          }
        }else{
          // console.log(parseInt(-pageY))
          // console.log(typeof parseInt(-pageY))
          // console.log(typeof this.$refs.titlepic.clientHeight)
          let scalenum=(parseInt(-pageY)/this.$refs.titlepic.clientHeight+1)
          // let scalenum=-pageY/this.$refs.titlepic.clientHeight + 1
          this.$refs.contain.style.zIndex = -1
          this.$refs.titlepic.style[Transform] = `scale(${scalenum})`
          // console.log(scalenum)
          // this.$refs.tab_c.style.zIndex = '-1'
          // this.$refs.tab_c.style.backgroundColor = 'white'
        }
      },
      getMusic(index){
        getLyric(this.songs[index].id).then((res)=>{
            // console.log(res.data.lrc.lyric)
            this.lyric = res.data.lrc.lyric
          // console.log(this.lyric)
        }).then(()=>{
          console.log(this)
          // console.log(this.songs)
          // console.log(index)  //歌曲的标志
          // console.log(this.singerName)
          let singerName = this.singerName
          let songs = this.songs
          // console.log(singer)
          this.allMutationsInSingerDetail({index,singerName,songs})
          console.log('我在singertail的getMusic里面')
          // consolqe.log('歌手的标识是' + this.$store.state.currentSinger)
          // console.log('歌曲的id是' + this.$store.state.currentSongId)
          // console.log('当前的曲库是'+this.$store.state.currentSingerSongs)
          // console.log('当前的歌曲名字是'+this.$store.state.currentSongName)
          // console.log('当前的歌手名字是'+ this.$store.state.currentSingerName)
          this.index = index
          console.log(index)
          let songName = this.getCurrentSongName
          let songPic = this.getCurrentSongPic
          console.log(this.songs)
          console.log(this.songs[index].id)
          this.$bus.$emit('clickList',this.index,songName,songPic,songs,this.lyric)
        })
      }
    },
    activated() {
      this._getSingerSongs()
      this.$refs.btscroll._scrollTo(0,0)
      // console.log('---')
    },
    computed:{
      ...mapGetters([
        // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
        // doneCount: 'doneTodosCount'
        'getSingerPic',
        'getCurrentSinger',
        'getCurrentSongName',
        'getCurrentSongPic'
      ])
    },
    components:{
      songlist,
      btscroll,
      loading
    }
  }
</script>

<style scoped>
  @import '../../../common/fonts/font2/iconfont.css';
  .icon-zuo{
    font-size: 20px;
  }
  .singerimg{
    height: 255px;
  }
  .singerimg img{
    width: 100%;
    position: fixed;
    z-index: -1;
  }
  .contain{
    position: absolute;
    height: 42px;
    line-height: 42px;
    background-color: rgb(217,97,88);
    width: 100vw;
    z-index: -1;
  }
  .tab_content{
    position: absolute;
    height: 42px;
    line-height: 42px;
    text-indent: 10px;
    width: 100vw;
    z-index: 5;
  }
  .tab span{
    font-size: 18px;
    padding-left: 10px;  /* 注意这里增加左边的是个元素 */
    /*transform: translate(100px,100px);  为什么这个样式是不会起作用的? */
  }
  .content{
    height: 100vh;
  }
  .singer_name{
    width: 100vw;
    height: 50px;
    line-height: 50px;
    position: absolute;
    top: -45px;
    text-indent: 30px;
    font-size: 17px;
    color: white;
    font-weight: bold;
    letter-spacing: 5px;
    z-index: 3;
  }
  .scroll_height{
    height: 100%;
  }
  .singername{
    font-size: 16px;
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
