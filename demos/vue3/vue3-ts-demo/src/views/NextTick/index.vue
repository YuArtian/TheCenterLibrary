<template>
  <div ref="now">{{ txt }}</div>
</template>
<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
onMounted(async () => {
  txt.value = '1'
  console.log('onMounted 1', now.value.innerHTML)
  txt.value = '2'
  console.log('onMounted 2', now.value.innerHTML)
  nextTick(() => {
    txt.value = '3'
    console.log('nextTick 3', now.value.innerHTML)
  })
  txt.value = '4'
  console.log('onMounted 4', now.value.innerHTML)
  nextTick(() => {
    txt.value = '5'
    console.log('nextTick 5', now.value.innerHTML)
  })
})
const now = ref()
const txt = ref('txt')
console.log('now', now)
</script>