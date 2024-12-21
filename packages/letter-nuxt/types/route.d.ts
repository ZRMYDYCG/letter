export { }

declare module '#app' {
  interface PageMeta {
    // 页面标题
    title?: string
    /** 是否需要登录 */
    auth?: boolean
    /** 面包屑 */
    breadcrumbs?: any[]
  }
}
