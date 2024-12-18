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
app.directive('hover-up', {
  mounted(el) {
    el.classList.add('transition-transform', 'duration-300', 'ease-in-out', 'delay-100') // 添加过渡效果
    el.addEventListener('mouseenter', () => {
      el.classList.add('transform', '-translate-y-2') // 鼠标经过时上浮并放大
    })
    el.addEventListener('mouseleave', () => {
      el.classList.remove('transform', '-translate-y-2') // 鼠标离开时复位
    })
  }
})

app.use(router)
app.use(pinia)
app.mount('#app')
