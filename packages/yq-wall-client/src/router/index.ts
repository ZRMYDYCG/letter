import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/wall?id=0',
      component: import('@/views/YiFeiHome/index.vue'),
      children: [
        {
          path: '/wall',
          component: import('@/views/YiFeiHome/children/WallMessage.vue')
        }
      ]
    }
  ]
})

export default router
