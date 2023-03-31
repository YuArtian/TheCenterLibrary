<template>
  <div class="father">
    Father Component
    <button @click="fa_click">点击父组件</button>
    <div>
      <Children ref="child"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Children from './Children.vue'
import { ref } from 'vue'

const child = ref(null)
console.log('ref_child', child.value)

const fa_click = () => {
  console.log('ref_child', child.value)
  console.log('fa_click!!!')
}
</script>
<!-- <script lang="ts">
import Children from './Children.vue'
export default {
  components: {Children},
  data() {
    return {
      child: null
    }
  },
  mounted() {
    console.log('ref', this.$refs['child'].ch_click())
    console.log('--', this.child)
  },
  methods: {
    fa_click(){}
  }
}
</script> -->
<style lang="less"></style>