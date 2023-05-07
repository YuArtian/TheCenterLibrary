import Vue from 'vue'
import App from './App.vue'
import App2 from './App2.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

new Vue({
  router,
  render: h => h(App2)
}).$mount('#app2')
