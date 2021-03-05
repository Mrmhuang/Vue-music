<template>
  <div class="main">
    <div v-if="this.getFull">
      <transition name="fade" appear>
        <div class="full">
          <div class="xiala" @click="changefull"><i class="iconfont icon-jiantou"></i></div>
          <div class="title">
            <div class="songname">{{songName}}</div>
              <div class="singername">- {{this.getCurrentSingerName}} -</div>
          </div>
          <div class="cd" v-if="!isGeci" @click="changeGeci"
               @touchstart="startToRight"
               @touchmove="toRight"
               @touchend="endToRight"

          >
            <transition name="pic">
              <div class="img xuan" ref="ro">
                <img :src="songPic" alt=""> <!--  @load="Rorate" -->
              </div>
            </transition>
          </div>
          <div class="geci" v-else @click="changeGeci"
               @touchstart="startToRight"
               @touchmove="toRight"
               @touchend="endToRight"

          >
            <transition name="ci">
              <btscroll class="content" ref="bts">
                <div>
                  <ul>
                    <li v-for="(item,index) in this.lyric.lines" ref="txt" :class="{light:index==currentTxtIndex}" :key="item.key">{{item.txt}}</li>
                  </ul>
                </div>
              </btscroll>
            </transition>
          </div>
          <div class="jindu_bar">
              <div class="currentTime">{{this.currentTime}}</div>
              <jindutiao :percent="percent" @changepercent="changepercent"></jindutiao>  <!-- @changepercent="changepercent" -->
              <div class="allTime">{{this.allTime}}</div>
          </div>
          <div class="foot">
            <div v-if="this.loop==0" @click="loopChange"><i class="iconfont icon-xunhuanbofang"></i></div>
            <div v-else-if="this.loop==1"  @click="loopChange"><i class="iconfont icon-suijibofang"></i></div>
            <div v-else @click="loopChange"><i class="iconfont icon-danquxunhuan"></i></div>
            <div @click="prevsong"><i class="iconfont icon-shangyishou"></i></div>
            <div v-if="isplay" id="zanting" @click="changePlay"><i class="iconfont icon-zanting"></i></div>
            <div v-else id="bofang" @click="changePlay"><i class="iconfont icon-bofang"></i></div>
            <div @click="nextsong"><i class="iconfont icon-xiayishou"></i></div>
            <div><i class="iconfont icon-xihuan"></i></div>
          </div>
        </div>
      </transition>
    </div>
    <div v-else>  <!-- v-show="!this.getFull" -->
<!--      <transition name="To">-->
        <div class="minmusic">
          <div class="left">
            <div class="minimg xuan" ref="ro">
              <img :src="songPic" alt="">
            </div>
            <div>
              <p>{{songName}}</p>
              <span> - {{this.getCurrentSingerName}}</span>
            </div>
          </div>
          <div class="right">
            <div @click="changefull"><i class="iconfont icon-fenlei-"></i></div>
            <div v-if="isplay" @click="changePlay"><i class="iconfont icon-zanting"></i></div>
            <div v-else @click="changePlay"><i class="iconfont icon-bofang"></i></div>
          </div>
        </div>
<!--      </transition>-->
    </div>
    <div v-if="this.songs[this.songIndex]!==undefined">
      <audio :src="this.songs[this.songIndex].al.songUrl" autoplay="autoplay" ref="au" @timeupdate="updateTime"></audio>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import btscroll from "../../baseComponent/scroll/btscroll";
  import jindutiao from "./music_son/jindutiao";
  import Lyric from "lyric-parser";

    export default {
      name: "music",
      data(){
        return {
          isfull:true,
          isplay:false,
          songs:[],
          songIndex:0,
          ispause:true,
          songName:'天外来物',
          songPic:'https://p2.music.126.net/LCWqYYKoCEZKuAC3S3lIeg==/109951165034938865.jpg',
          currentTime:'0:00',
          allTime:'0:00',
          percent:0,
          loop:0,
          isGeci:false,
          lyric:undefined,
          currentTxtIndex:1,
          touch:{}
        }
      },
      created() {
        // console.log('music组件被重建了')
        // this.songs = this.getCurrentSingerSongs
        // console.log(this.songs)
        // console.log(this.songs[0].al.songUrl)
      },
      mounted() {
        setTimeout(()=>{
          if(this.$refs.bts!==undefined) {
            this.$refs.bts.scroll.refresh()
          }
        },200)
        let _this = this
        this.$bus.$on('clickList',function (index,songName,songPic,songs,lyric) {
          // _this.$refs.ro.style.animationPlayState = 'running'
          this.$nextTick(()=>{
            _this.$refs.ro.style.animationPlayState = 'running'
            console.log(_this.$refs.ro)
          })
          _this.songs = songs
          console.log(_this.songs)
          _this.songIndex = index
          console.log(_this.songIndex)
          if(_this.isplay==false){
            _this.isplay = true
          }
          _this.ispause = false
          _this.songName = songName
          console.log(songName)
          _this.songPic = songPic
          console.log(songPic)
          console.log(_this.songs[_this.songIndex].al.songUrl)
          // console.log(lyric)
          _this.lyric = new Lyric(lyric,this.handleLyric)
          console.log(_this.lyric.play) //这是lyric这个工具包里面的方法，play。所以可以直接使用，播放歌词的意思
          _this.lyric.play()
          // _this.lyric = lyric
          console.log(_this.lyric)
        })
      },
      methods:{
        ...mapActions([
          'allMutationsInSingerDetail'
        ]),
        ...mapMutations([
          'SetFull'
        ]),
        handleLyric(lineNum){
          this.currentTxtIndex = lineNum
          console.log(lineNum)
        },
        loopChange(){
          if(this.loop+1==3){
            this.loop = 0
          }else {
            this.loop++
          }
        },
        changepercent(percent){
          this.$refs.au.currentTime = this.$refs.au.duration * percent
        },
        updateTime(e){
          let minute = parseInt((e.target.currentTime | 0) / 60)
          let seconds = parseInt((e.target.currentTime | 0) % 60)
          if(seconds<10){
            seconds = '0' + seconds
          }
          this.currentTime = minute + ':' + seconds
          let allMinute = parseInt((this.$refs.au.duration | 0) / 60)
          let allSeconds = (this.$refs.au.duration | 0) % 60
          if(allSeconds<10){
            allSeconds = '0' + allSeconds
          }
          this.allTime = allMinute + ':' + allSeconds
          this.percent = e.target.currentTime/this.$refs.au.duration
          // console.log(e.target.currentTime)
          // console.log(this.$refs.au.duration)
          if(e.target.currentTime >= this.$refs.au.duration){
            if(this.loop==0){
              setTimeout(()=>{
                this.nextsong()
              },2000)
            }else if(this.loop==1){
              setTimeout(()=>{
                this.randomSong()
              },2000)
            }else {
              setTimeout(()=>{
                this.$refs.au.currentTime = 0
                this.$refs.au.pause()
                this.$refs.au.play()
              },2000)
            }
          }
        },
        changefull(){
          this.SetFull()
          this.$nextTick(()=>{
            if(this.isplay){
              this.$refs.ro.style.animationPlayState = 'running'
            }else {
              this.$refs.ro.style.animationPlayState = 'paused'
            }
          })
        },
        changePlay(){
          console.log('原本isplay是:' + this.isplay)
          this.isplay = !this.isplay
          // console.log(!this.isplay)
          console.log('此时isplay是:' + this.isplay)

          console.log('原本的this.ispause'+this.ispause)
          this.ispause=!this.ispause
          console.log('现在的this.ispause'+this.ispause)
          if(!this.ispause){
            this.$refs.au.play()
            if(this.$refs.ro!==undefined){
            this.$refs.ro.style.animationPlayState = 'running'
            }
          }else {
            this.$refs.au.pause()
            if(this.$refs.ro!==undefined){
              this.$refs.ro.style.animationPlayState = 'paused'
            }
          }
        },
        prevsong(){
          if(this.songIndex - 1 < 0){
            this.songIndex = this.songs.length-1
          }else {
            this.songIndex--
          }
          if(this.isplay == false && this.ispause==true){
            this.isplay = true
            this.ispause = false
          }
          this.songName = this.songs[this.songIndex].al.name
          this.songPic = this.songs[this.songIndex].al.picUrl
          this.$refs.ro.style.animationPlayState = 'running'
          console.log(this.songPic)
        },
        nextsong(){
          if(this.songIndex + 1 == this.songs.length){
            this.songIndex = 0
          }else {
            this.songIndex++
          }
          if(this.isplay == false && this.ispause==true){
            this.isplay = true
            this.ispause = false
          }
          this.$refs.ro.style.animationPlayState = 'running'
          this.songName = this.songs[this.songIndex].al.name
          this.songPic = this.songs[this.songIndex].al.picUrl
          console.log(this.songPic)
          console.log(this.songs)
        },
        randomSong(){
          let index = Math.random() * this.songs.length | 0
          console.log(index)
          this.songIndex = index
          this.songName = this.songs[this.songIndex].al.name
          this.songPic = this.songs[this.songIndex].al.picUrl
        },
        Rorate(){
          if(this.$refs.ro!==undefined){
            this.$refs.ro.style.animationPlayState = 'running'
          }
        },
        changeGeci(){
          this.isGeci = !this.isGeci
        },
        startToRight(e){
          console.log(e)
          this.touch.startX = e.touches[0].pageX
          this.touch.startY = e.touches[0].pageY
        },
        toRight(e){
          this.touch.addX = e.touches[0].pageX - this.touch.startX
          this.touch.addY = e.touches[0].pageY - this.touch.startY
        },
        endToRight(e){
          // console.log(this.touch.addX + " " + this.touch.addY)
          if(this.touch.addX > this.touch.addY && this.isGeci==true){
            this.isGeci = !this.isGeci
            // console.log(this)
            // console.log("我被执行了")
          }
          if(this.touch.addX < this.touch.addY && this.isGeci==false){
            this.isGeci = !this.isGeci
            // console.log(this)
            // console.log("我被执行了")
          }
        }
      },
      computed:{
        ...mapGetters([
          'getCurrentSongName',
          'getCurrentSingerName',
          'getCurrentSongPic',
          'getFull',
          'getCurrentSingerSongs',
          'getCurrentSongId'
        ])
      },
      components:{
        jindutiao,
        btscroll
      },
      watch:{
        ispause:(value)=>{
          console.log(this)
          // if(!value && this.$refs.ro!==undefined){
          //   this.$refs.ro.style.animationPlayState = 'running'
          // }else {
          //   this.$refs.ro.style.animationPlayState = 'pause'
          // }
        }
      }
    }
</script>

<style scoped>
  @import "../../common/fonts/font4/iconfont.css";
  @import "../../common/fonts/font5/iconfont.css";
  @import "../../common/fonts/font1/iconfont.css";
  @import "../../common/fonts/font3/iconfont.css";
  @import "../../common/fonts/font5/iconfont.css";
  @import "../../common/fonts/font7/iconfont.css";
  /*关于transition组件的使用*/
  .fade-enter{
    opacity: 0;
    transform: translate(0,100%);
  }
  .fade-enter-to{
    opacity: 1;
  }
  .fade-enter-active{
    transition: all .4s;
    /*transform: translate(10px); 关于上啦的问题还没有解决*/
  }
  .fade--leave{
    opacity: 1;
  }
  .fade-leave-to{
    opacity: 0;
    transform: translate(0,calc(100% - 50px));
  }
  .fade-leave-active{
    transition: all 0.4s;
  }
  .pic-leave,.pic-enter-to{
    opacity: 1;
  }
  .pic-leave-to,.pic-enter{
    opacity: 0;
  }
  .pic-enter-active,.pic-leave-active{
    transition: all 1s;
  }
  .ci-enter,.ci-leave-to{
    opacity: 0;
  }
  .ci-enter-to,.ci-leave{
    opacity: 1;
  }
  .ci-enter-active,.ci-leave-active{
    transition: all 1s;
  }
  .main{
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  .full{
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgb(120,108,106);
    z-index: 9999;
  }
  .jindu_bar{
    position: relative;
    height: 17px;
    display: flex;
    justify-content: center;
    line-height: 17px;
  }
  .currentTime{
    position: absolute;
    left: 10px;
  }
  .allTime{
    position: absolute;
    right: 10px;
  }

  .xiala{
    position: absolute;
    height: 50px;
    width: 50px;
    text-align: center;
    line-height: 50px;
    left: 0;
  }
  .xiala i{
    font-size: 25px;
  }
  .title{
    height: 50px;
    text-align: center;
  }
  .songname{
    height: 20px;
  }
  .singername{
    height: 20px;
  }
  .songname{
    padding-top: 5px;
    font-size: 15px;
    font-weight: bold;
  }
  .singername{
    padding-top: 5px;
    font-size: 13px;
  }
  .cd{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65%;
    width: 100%;
  }
  .geci{
    height: 65%;
    width: 100%;
    overflow: hidden;
  }
  .geci li{
    text-align: center;
  }

  .light{
    color: #55a532;
  }
  .content{
    width: 100%;
    height: 100%;
  }
  .img{
    width: 270px;
    height: 270px;
    background-color: red;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    /*overflow: hidden;*/
  }
  .img img{
    width: 100%;
    height: 100%;
  }
  .foot{
    height: calc(21% - 50px);
    display: flex;
    text-align: center;
    padding-top: 18%;
  }
  #bofang i,#zanting i{
    font-size: 42px;
  }
  .foot i{
    font-size: 28px;
  }
  .foot div{
    flex: 1;
    width: 50px;
    height: 50px;
    line-height: 50px;
  }
  .minmusic{
    position: fixed;
    width: 100vw;
    height: 50px;
    line-height: 50px;
    top: 100vh;
    transform: translate(0,-50px);
    z-index: 10000;
    background-color: rgba(232,230,223,0.9);
  }
  .minimg{
    position: absolute;
    width: 44px;
    height: 44px;
    background-color: #9a6e3a;
    border-radius: 50%;
    top: 50%;
    margin-top: -22px;
    overflow: hidden;
  }
  .minimg img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .left{
    height: 50px;
    width: 60%;
  }
  .left div,.left p{
    float: left;
    margin-left: 15px;
  }
  .left span{
    font-size: 14px;
  }
  .right{
    height: 50px;
    width: 40%;
    color: rgb(102,112,112);
  }
  .left,.right{
    float: left;
  }
  .left p{
    display: inline-block;
    text-indent: 45px;
  }
  .right div{
    float: right;
    height: 100%;
    width: 25%;
  }
  .right i{
    font-size: 28px;
  }

  /*关于动画的旋转*/
  .xuan{
    animation-name: xuan;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 24s;
    animation-play-state: paused;
  }
  @keyframes xuan {
    0% {transform: rotate(0deg);}
    20% {transform: rotate(90deg);}
    50% {transform: rotate(180deg);}
    80% {transform: rotate(270deg);}
    100% {transform: rotate(360deg);}
  }
</style>
