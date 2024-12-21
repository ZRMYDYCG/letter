export default defineNuxtRouteMiddleware(async (to, from) => {
  // const userPinia = useUserPinia()
  if (to.meta && to.meta.auth !== false) {
    // if (userPinia.getToken) {
    //   const res = await refresh()
    //   import.meta.client && console.log('刷新Token', res)
    //   const { code } = res
    //   if (code === 401) {
    //     return navigateTo(`/login?redirect=${to.fullPath}`)
    //   }
    // }
    // else {
    //   return navigateTo(`/login?redirect=${to.fullPath}`)
    // }
  }
})
