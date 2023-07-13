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
  async mounted() {
    this.now = 'mounted1'
    console.log('mounted -1', this.$refs.test1.innerHTML)

    this.$nextTick(() => {
      console.log('nextTick-1', this.$refs.test1.innerHTML)
      this.now = 'nextTick1'
    })
    Promise.resolve().then(() => {
      console.log('Promise', this.$refs.test1.innerHTML)
    })
    // await this.$nextTick(() => {
    this.$nextTick(() => {
      console.log('nextTick-2', this.$refs.test1.innerHTML)
      this.now = 'nextTick2'
      this.$nextTick(() => {
        this.now = 'nextTick4'
        console.log('nextTick-4', this.$refs.test1.innerHTML)
      })
      this.$nextTick(() => {
        this.now = 'nextTick5'
        console.log('nextTick-5', this.$refs.test1.innerHTML)
      })
    })

    this.now = 'mounted2'
    console.log('mounted -2', this.$refs.test1.innerHTML)
    this.$nextTick(() => {
      console.log('nextTick-3', this.$refs.test1.innerHTML)
      this.now = 'nextTick3'
      this.$nextTick(() => {
        this.now = 'nextTick6'
        console.log('nextTick-6', this.$refs.test1.innerHTML)
      })
    })
  }
}
</script>
<style></style>