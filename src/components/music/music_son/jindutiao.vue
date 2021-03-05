<template>
    <div class="main" ref="content">
      <div class="jindutiao" ref="jindu" @click="toHere">
        <div class="factjindu" ref="factjindu"></div>
        <div class="btn"
             ref="btn"
             @touchstart.prevent="jindustart"
             @touchmove.prevent="jindumove"
             @touchend.prevent="jinduend"
        >
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "jindutiao",
      data(){
        return{
          touch:{},
          initWatch:true,
          newpc:0
        }
      },
      props:{
        percent:{
          type:Number,
          defalt: 0.05
        }
      },
      watch:{  //不能使用箭头函数，若是使用了箭头函数就是underfined
        percent:function(val){
          // console.log(val)
          if(val>0 && this.initWatch){
            let jindutiaoLength = this.$refs.jindu.clientWidth
            this.$refs.factjindu.style.width = (jindutiaoLength * val)+ 'px'
            this.$refs.btn.style.left = (jindutiaoLength * val) - 8 + 'px'
          }
        }
      },
      methods:{
        jindustart(e){
          // console.log(e)
          this.touch.startX = e.touches[0].pageX
          this.touch.factjinduWidth = this.$refs.factjindu.clientWidth
          // console.log(this.touch.startX)
        },
        jindumove(e){
          this.initWatch = false
          let currentX = e.touches[0].pageX
          // console.log(currentX)
          this.$refs.factjindu.style.width = Math.min(this.$refs.jindu.clientWidth,this.touch.factjinduWidth + (currentX - this.touch.startX)) + 'px'
          // console.log(this.$refs.factjindu.style.width)
          this.$refs.btn.style.left = Math.max(-8,Math.min(this.$refs.jindu.clientWidth-10,this.touch.factjinduWidth + (currentX - this.touch.startX) - 8)) + 'px'
          this.newpc = (this.touch.factjinduWidth + currentX - this.touch.startX) / this.$refs.jindu.clientWidth
        },
        jinduend(e){
          console.log(this.newpc)
          this.$emit('changepercent',this.newpc)
          this.initWatch = true
        },
        toHere(e){
          // this.$refs.factjindu.style.width = this.$refs.factjindu.clientWidth
          // console.log(e.pageX)
          console.log((this.$refs.content.clientWidth - this.$refs.jindu.clientWidth) / 2 | 0)
          let leftx = (this.$refs.content.clientWidth - this.$refs.jindu.clientWidth) / 2 | 0
          this.$refs.factjindu.style.width = (e.pageX - leftx) + 'px'
          this.$refs.btn.style.left = Math.max(-8,Math.min(this.$refs.jindu.clientWidth-10,(e.pageX - leftx - 8))) + 'px'
          this.newpc = this.$refs.factjindu.clientWidth / this.$refs.jindu.clientWidth
          // console.log(this.newpc)
          this.$emit('changepercent',this.newpc)
        }
      }
    }
</script>

<style scoped>
  .main{
    position: relative;
    width: 100vw;
    height: 20px;
  }
  .jindutiao{
    position: relative;
    margin: 0 auto;
    width:70%;
    height: 15px;
    background-color: #55a532;
    display: flex;
    border-radius: 10px;
    z-index: 999;
    border: 1px solid black;
  }
  .factjindu{
    /*width: 270px;*/
    position: relative;
    height: 15px;
    border-radius: 5px;
    background-color: deepskyblue;
  }
  .btn{
    position: absolute;
    z-index: 999;
    top: -1px;
    left: -8px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: blue;
    border: 1px solid #b3d4fc;
  }

</style>
