export const useUserPinia = defineStore('user', () => {
  const token = ref<string>(undefined)
  const userId = ref<string>('')

  const getToken = computed(() => token.value)
  const getUserId = computed(() => userId.value)

  function setToken(value) {
    token.value = value
    userId.value = value
  }

  function getUserAuth() {
    import.meta.client && console.log('重新获取用户信息')
  }

  return { userId, token, getUserId, getToken, setToken, getUserAuth }
}, {
  persist: [
    {
      pick: ['token'],
      storage: piniaPluginPersistedstate.cookies({ maxAge: 604800 }),
    },
    {
      pick: ['userId'],
      storage: piniaPluginPersistedstate.localStorage(),
    },
  ],
})
