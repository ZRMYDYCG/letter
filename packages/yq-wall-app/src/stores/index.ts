import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// 安装持久化插件
pinia.use(persist)

export default pinia
