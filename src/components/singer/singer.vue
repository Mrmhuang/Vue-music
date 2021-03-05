<template>
          <div class="main">
              <btscroll class="content" ref="btscroll" :position="true" @position="getPositionY">  <!-- 注意这里的position如果不绑定，那传的是字符串而不是布尔值 -->
              <div v-for="(item,index) in this.singers" class="singer" ref="sin">
              <div v-if="item.num>=0" class="title">{{firstP(item.num)}}</div>
            <div @click="toSingerDetail(item,index)">
              <img v-lazy="item.pic" alt="" @load="toRefresh(50,index)">
              <span>{{item.name}}</span>
            </div>
            </div>
            <div class="kongbai" ref="kong"></div>
              </btscroll>
              <div class="zimu" @touchstart="onShortcutStart" @touchmove.stop.prevent="onShortcutMove">
              <ul>
              <li v-for="(item,index) in this.zimu" :data-index="index" :class="{light:currentIndex == index}">{{item}}</li>
            </ul>
            </div>
            </div>
            </template>

            <script>
            import btscroll from "../../baseComponent/scroll/btscroll";
            import {getSingers,singer} from "../../network/recommend";
            import transformPY from "../../api/transformPY/vue-py"
            import {debounce_4} from "../../api/debounce/debounce";
            import {getdata} from "../../getdata/getdata";
            import { mapMutations } from 'vuex'
            // import test from "../../components/singer/singer-son/test";

            export default {
              name: "singer",
              data(){
                return {
                  zimu:[],
                  singers:[],
                  singerdata:[],
                  temp:null,
                  listHeight:[],
                  currentIndex:0,
                  list:[]
                }
              },
              components:{
                btscroll,
                // test
              },
              created() {
                this.touch = {}
              },
              mounted() {
                // setTimeout(()=>{
                new Promise((resolve, reject) => {
                  this._getSingers()
                }).then((res)=>{
                  // this._zhuanzimu()
                  console.log(res)
                })
                  // this._zhuanzimu()
                  // this.computedList()
                // },50)
                setTimeout(()=>{
                  this._zhuanzimu()
                },250)

                setTimeout(()=>{
                  this.computedList()
                },450)
              },
              methods:{
                ...mapMutations([
                  'pushSingerPic',
                  'setCurrentSinger'
                ]),
                _getSingers(){
                  getSingers().then(res=>{  //是直接保存在一个变量里面还是说直接不断地返回
                    // console.log(res)
                    this.singerdata = res.data.artists
                    console.log(this.singerdata)
                    // console.log(res.data.artists)
                    // console.log(this.singerdata)
                  })
                },
                _zhuanzimu(){
                  // for(let i=0;i<26;i++){
                  //   this.zimu.push(String.fromCharCode((65+i)))  //找到26个英文字母
                  // }
                  new Promise((resolve,reject)=>{
                    let firstname = ''
                    console.log(this.singerdata)
                    // this.singerdata.forEach(value => {
                    //   firstname = transformPY.chineseToPinYin(value.name).charAt(0)
                    //   this.singers.push(new singer(value.name,value.picUrl,firstname,value.id))
                    // }) 这里的forEach换成了for循环bug解决了一些
                    for(let i=0;i<this.singerdata.length;i++){
                      firstname = transformPY.chineseToPinYin(this.singerdata[i].name).charAt(0)
                      this.singers.push(new singer(this.singerdata[i].name,this.singerdata[i].picUrl,firstname,this.singerdata[i].id))
                    }
                    this.singers.sort((a,b)=>{
                      if(a.firstname < b.firstname){
                        return -1
                      }else if(a.firstname > b.firstname){
                        return 1
                      }else {
                        return 0
                      }
                    })
                    console.log(this.singers)
                    resolve()
                  }).then(()=>{
                     // console.log(this)
                      for (let i=0;i<this.singers.length;i++){
                        this.pushSingerPic(this.singers[i].pic)  //把歌手数据全部放入vuex中进行管理
                      }
                      // console.log(this.singers[0].firstname)
                      //先给第一个数据加上index,再给下面需要的数据都加上num
                      //   console.log(this.singer[0])
                    if(this.singers[0].firstname!==undefined){
                      this.singers[0].num = parseInt(this.singers[0].firstname.charCodeAt(0))-65
                    }
                      this.zimu.push(String.fromCharCode(65+this.singers[0].num))
                      this.singers.forEach((item,index)=>{
                        if(index>=1 && this.singers[index-1].firstname!==item.firstname){
                          item.num = parseInt(item.firstname.charCodeAt(0))-65
                          this.zimu.push(String.fromCharCode(65+item.num))
                        }
                    })
        })
      },
      refresh(){
        this.$refs.btscroll.refresh()
        // console.log('-')
      },
      toRefresh(length,index){
        this.temp = debounce_4(this.refresh,20)
        this.temp()
        // if((index+1)==length){
        //   const temp = debounce_4(this.refresh,20)
        //   temp()
        //   console.log('true')
        // }

      },
      firstP(index){
        return String.fromCharCode((65+index))  //找到26个英文字母并且显示
      },
      computedList(){
          this.list = this.$refs.sin
          console.log(this.list)
          console.log(this.list.length)
          this.listHeight.push(0)
          for(let i=0;i<this.list.length;i++){
            if(this.singers[i].num){
              let itemHeight = this.list[i].offsetTop - 180
              this.listHeight.push(itemHeight)
              // console.log(itemHeight)
            }
          }
      },
      onShortcutStart(e){
        const value = getdata(e.target,'index')
        // console.log(value)
        // console.log(e)
        let pageY = this.listHeight[value]
        this.currentIndex = value
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = value
        // console.log(this.touch.anchorIndex)

        // console.log(pageY)
        // this.$refs.btscroll.scroll.scrollToElement(this.$refs._singers[value], 200, 0, 0)
        this.$refs.btscroll._scrollTo(0,-pageY)
        // console.log(pageY)
        // 灵活运用this.$refs获取元素,了解let和var的区别,了解如何获取元素的各个位置,知道了事件点击可以有e
        // 发生了元素和高度不对应的情况
        // v-if 和 v-show 的区别
      },
      onShortcutMove(e){
        let firshTouch = e.touches[0]
        this.touch.y2 = firshTouch.pageY
        // console.log(this.touch.y2)
        // console.log(this.touch.y1)
        let delta = (parseInt(this.touch.y2) - parseInt(this.touch.y1)) / 16 | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta  //计算字母之间的差距，说明在几个格子的区间
        // console.log(anchorIndex)
        this.currentIndex = anchorIndex
        // this.$refs.btscroll.scroll.scrollToElement(this.$refs._singers[anchorIndex], 0, 0, 800)
        this.$refs.btscroll._scrollTo(0,-this.listHeight[anchorIndex])
        // console.log('成功启动了移动事件')
      },
      getPositionY(pos){
        //加多一个listHeight方便遍历
        // this.listHeight.push(Number.MAX_VALUE)  发现不行
        let pageY = -pos.y
        for (let i=0;i<this.listHeight.length-1;i++){
          if(this.listHeight[i] < pageY && pageY < this.listHeight[i+1]){
            this.currentIndex = i + 1
          }
          if(pageY <= 1){
            this.currentIndex = 0
          }
          // console.log('上'+this.listHeight[i])
          // console.log('下'+this.listHeight[i+1])
          // console.log(pageY)
        }
        // if(pageY>2830){
        //
        // }
      },
      toSingerDetail(item,index){
        this.$emit('toSingerDetail',item)
        this.setCurrentSinger(index)
      }
    },
    computed:{

    }
  }
</script>

<style scoped>
  .main{
    height: 100vh;
  }
  .content{
    height: calc(500px);
  }
  img{
    width: 15%;
  }
  .singer{
    /*background-color: #42b983;*/
    margin: 15px 0 8px 0;
    border-bottom: 1px solid rgb(217,218,219);
    position: relative;
    bottom: 8px;
  }
  .title{
    color: rgb(226,226,227);
    font-size: 12px;
    background-color: #7e8c8d;
    text-indent: 10px;
    margin-bottom: 8px;
  }
  .kongbai{
    height: 100px;
  }
  .zimu{
    position: fixed;
    right: 8px;
    top: 53vh;
    font-size: 11px;
    transform: translate(0,-50%);
  }
  .zimu li{
    margin-top: 1px;
  }
  .light{
    color: orangered;
  }
</style>
