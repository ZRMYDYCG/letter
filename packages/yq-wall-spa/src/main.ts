import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import './styles/index.css'
import './styles/commons/index.css'
import './iconfont/iconfont.css'
const pinia = createPinia()
pinia.use(
  createPersistedState({
    storage: sessionStorage
  })
)
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
