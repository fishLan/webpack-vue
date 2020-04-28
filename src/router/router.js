import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _router = new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/page/home.vue'),
    },
    {
      name: 'test',
      path: '/',
      component: () => import('@/page/test.vue'),
    },
  ],
})

export default _router
