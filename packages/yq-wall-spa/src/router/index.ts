import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/index.vue') // 主页面
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue') // 登录页面
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/profile/index.vue') // 个人资料页面
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register/index.vue') // 注册页面
    },
    {
      path: '/:catchAll(.*)', // Vue Router 4.x 版本支持 catchAll
      name: 'NotFound',
      component: () => import('@/views/error/index.vue') // 404 页面
    }
  ]
})

export default router
