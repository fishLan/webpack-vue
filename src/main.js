import Vue from 'vue'
import App from './App.vue'
import '@/css/var.less'
import router from './router/router.js'
import '@/css/common.less'

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
