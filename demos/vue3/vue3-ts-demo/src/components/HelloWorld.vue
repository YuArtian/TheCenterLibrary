<!-- <script setup lang="ts">
// defineProps<{
//   msg: string
// }>()
</script> -->

<script lang="ts">
import { defineComponent, onMounted, onUpdated, getCurrentInstance } from 'vue';


export default defineComponent({
  props: ['msg'],
  setup(props: any) {
    const vm = getCurrentInstance()
    console.log('props', props)
    onMounted(() => {
      console.log('mounted-1')
    })
    onUpdated(() => {
      console.log('onUpdated-1')
      console.log('vm', vm)
      // vm.data.msg2= 'update'
    })
    return {
      // msg: 'xxxxx'
      // ...props
      msg2: props.msg + '2222'
    }
  },
  mounted() {
      console.log('mounted-2')
  },
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h1 class="green">{{ msg2 }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
