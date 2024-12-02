import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: import('@/views/home/index.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: import('@/views/login/index.vue')
    }
  ]
})

export default router
