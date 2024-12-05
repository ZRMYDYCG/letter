import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/index.css'
import './styles/commons/index.css'
import Directives from './directives'

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Directives)
app.mount('#app')
