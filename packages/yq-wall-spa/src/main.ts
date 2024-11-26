import App from './App.vue'
import './styles/index.css'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
