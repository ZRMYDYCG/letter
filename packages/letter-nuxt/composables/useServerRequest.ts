import type { UseFetchOptions } from 'nuxt/app'

export function useServerRequest<DataT, ErrorT>(url: string, opts?: UseFetchOptions<DataT>, meta?: any): Promise<any> {
  const userPinia = useUserPinia()
  const token = userPinia.getToken
  const runtimeConfig = useRuntimeConfig()

  const defaultOptions: UseFetchOptions<DataT> = {
    ...opts,
    onRequest({ options }) {
      options.method = opts.method.toString()
      // 是否携带http 不携带就使用默认值
      const baseURL = runtimeConfig.public.prefix || runtimeConfig.public.api.baseUrl
      !url.includes('http') && (options.baseURL = opts?.baseURL?.toString() || baseURL)
      // 微服务名称 根据不同微服务调用不同接口
      meta.sever && (options.baseURL = `${options.baseURL}/${meta.sever}`)
      // 添加请求头,没登录不携带token
      options.headers = new Headers(options.headers)
      meta?.auth && options.headers.set('Authorization', `Bearer ${token}`)
    },
    onResponse({ response }) {
      const data = response._data

      const successStatus = [0, 1, 200, 401]

      if (!successStatus.includes(data.code)) {
        if (meta?.toast) {
          import.meta.client && ElMessage.error(data.message || data.msg || '请求失败！请您稍后重试')
        }
        console.groupCollapsed('🚀 file: useClientRequest.ts:30 🚀')
        console.log('错误接口', url)
        console.log('请求方式', opts.method)
        console.log('错误码', data.code)
        console.log('错误提示', data.message || data.msg)
        console.groupEnd()

        return Promise.reject(data)
      }
    },
  }

  return useFetch<DataT, ErrorT>(url, { ...defaultOptions } as any)
}
