<template>
  <div class="warpper" ref="warp">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  export default {
    name: "btscroll",
    data(){
      return{
        scroll:null
      }
    },
    props:{
      probeType:{
        type:Number,
        default:3
      },
      click:{
        type:Boolean,
        default: true
      },
      data:{
        type:Array,
        default:null
      },
      position:{
        type:Boolean,
        default:false
      }
    },
    mounted() {
      setTimeout(()=>{
        this.scroll = new BScroll(this.$refs.warp,{
          probeType: this.probeType,
          click: this.click,
          startY: true
        })
        if(this.position){
          this.scroll.on('scroll',pos=>{
            this.$emit('position',pos)
          })
        }
      },20)
    },
    methods:{
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      enable(){
        this.scroll && this.scroll.enable()
      },
      disable(){
        this.scroll && this.scroll.disable()
      },
      _scrollTo(x,y,time=200){
        // console.log('123')
        this.scroll && this.scroll.scrollTo(x,y)
      }
    },
    watch:{
      data(){
        this.scroll && this.scroll.refresh()
        console.log('-0')
      }
    }
  }
</script>

<style scoped>
  .warpper{
    height: 100%;
  }
</style>
