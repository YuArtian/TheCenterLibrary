<template>
  <div>
    Children
    <button @click="ch_click">点击子组件</button>
  </div>
</template>
<script lang="ts" setup>
import {defineExpose}from 'vue'
const ch_click = () => {
  console.log('ch_click!!')
  return 'ch_click'
}

defineExpose({
  ch_click
})
</script>