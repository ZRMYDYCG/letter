import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/wall?id=0',
      component: import('@/views/home/index.vue'),
      children: [
        {
          path: '/wall',
          component: import('@/views/home/children/WallMessage.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: import('@/views/login/index.vue')
    }
  ]
})

export default router
