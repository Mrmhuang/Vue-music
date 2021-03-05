<template>
  <div class="content">
    <div>
      <img src="~common/img/loading/loading.gif" alt="图片">
    </div>
    <p>{{title}}</p>
  </div>
</template>

<script>
  export default {
    name: "loading",
    props:{
      title:{
        type:String,
        default:'正在载入...'
      }
    }
  }
</script>

<style scoped>
  img{
    width: 15%;
  }
  h3,div{
    text-align: center;
  }
  .content{
    margin-top: 100px;
  }
</style>
