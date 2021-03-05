<template>
  <div class="Slider" ref="Slider">
    <div class="slider-item" ref="sliderItem">
      <slot></slot>
    </div>
    <div class="dos" v-if="this.child!==0">
      <span v-for="(item,index) in this.child" class="dot" :class="{dot_active:currentPageIndex==index}">
      </span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  //BSscroll文档:https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/api-specific.html
  import addClass from "../../api/addClass/addClass";
  export default {
    name: "slider",
    props:{
      loop:{
        type:Boolean,
        default:true
      },
      interval:{
        type: Number,
        default: 2000
      },
      auto:{
        type: Boolean,
        default:true
      }
    },
    data(){
      return{
        scroll:null,
        currentPageIndex:0,
        timer:null,
        child:0
      }
    },
    mounted() {
      setTimeout(()=>{
        this.setSliderWidth()
        this.initSlider()
      },20)
    },
    methods:{
      setSliderWidth(){
        let width = 0
        let child = this.$refs.sliderItem.children
        this.child = child.length
        console.log(child)
        let sliderWidth = this.$refs.Slider.clientWidth
        for (let i=0;i<child.length;i++){
          width+=sliderWidth
          addClass(child[i],'slider-each-item')
        }
        if(this.loop){
          width+=2*sliderWidth
        }
        // console.log(width)
        this.$refs.sliderItem.style.width = width + 'px'
      },
      initSlider(){
        this.scroll = new BScroll(this.$refs.Slider,{
          scrollX:true,
          snap:{
            //关于BTscroll的内容 https://www.cnblogs.com/zhengyan/p/7602712.html
            loop: true,  //是否无缝轮播，前后会加一张图片
            momentum:false, //滑动的时候是否有惯性
            snapSpeed: 400,  //轮播图切换的动画时间
            snapThreshold: 0.1 //用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
          }
        })
        if(this.auto) {
          this.autoPlay()
        }
        this.scroll.on('scrollEnd', this.onScrollEnd)  //监听加阻止轮播+手动滑动的bug(滚动结束的时候触发)
      },
      onScrollEnd () {
        let pageIndex = this.scroll.getCurrentPage().pageX  //getCurrentPage是btscroll原有的事件，具体看文档
        this.currentPageIndex = pageIndex
        if (this.auto) {
          this.autoPlay()
        }
      },
      autoPlay(){
        clearInterval(this.timer)   //如何阻止手指滑动 + 自动轮播的bug
        this.timer = setInterval(()=>{
          this.scroll.next()
          this.currentPageIndex++
        },this.interval)
      },
      dos(){

      }
    }
  }

  //总结：better-scroll手撕轮播图
  //引入better-scroll
  //div.slider包裹div.sliderItem包裹slot
  //给div.slider引用BTscroll事件，让slider100%，让sliderItem的width是子元素个数的个数倍
  //启动btscroll，配置参数，完成
  //解决 手动滑动+轮播 bug：写一个函数，on事件监听scrollend，滑动的时候就重置轮播的时间。
</script>

<style scoped>
  img{
    width: 100vw;
    height: 100%;
  }
  .Slider{
    min-height: 1px;
    position: relative;
    overflow: hidden;
  }
  .slider-item{
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    height: 145.9px;
  }
  .slider-each-item{
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
  }
  .dos{
    text-align: center;
    position: relative;
    bottom: 25px;
  }
  .dot{
    top: 0;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 0 2px 0 2px;
    border: 1px solid;
  }
  .dot_active{
    background-color: #7e8c8d;
  }
</style>
