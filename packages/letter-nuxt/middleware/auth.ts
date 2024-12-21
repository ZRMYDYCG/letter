export default defineNuxtRouteMiddleware((to, from) => {
  const userPinia = useUserPinia()
  if (userPinia.getToken) {
    userPinia.getUserAuth()
  }
})
