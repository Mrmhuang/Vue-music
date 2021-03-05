<template>
  <div>
    <div ref="think">123</div>
  </div>
</template>

<script>
  export default {
    name: "test",
    mounted() {
      console.log(this.$refs.think)
    }
  }
</script>

<style scoped>

</style>
