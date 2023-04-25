<template>
  <div>
    <div id="now" ref="test1">{{now}}</div>
  </div>
</template>
<script>
export default {
  name: 'next-tick',
  data() {
    return {
      now: 'default'
    }
  },
  mounted() {
    console.log('mounted -1')
    this.now = 'mounted1'
    this.$nextTick(() => {
      console.log('nextTick-1', this.$refs.test1.innerHTML)
      this.now = 'nextTick1'
    })
    this.$nextTick(() => {
      console.log('nextTick-2', this.$refs.test1.innerHTML)
      this.now = 'nextTick2'
    })
    console.log('mounted -2')
    this.now = 'mounted2'
    this.$nextTick(() => {
      console.log('nextTick-3', this.$refs.test1.innerHTML)
      this.now = 'nextTick3'
    })
  }
}
</script>
<style></style>