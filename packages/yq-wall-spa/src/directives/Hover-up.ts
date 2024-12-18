import type { App, Directive } from 'vue'

interface IDirectives {
  [key: string]: Directive
}

const directives: IDirectives = {
  'hover-up': {
    mounted(el) {
      el.classList.add('transition-transform', 'duration-300', 'ease-in-out', 'delay-100') // 添加过渡效果
      el.addEventListener('mouseenter', () => {
        el.classList.add('transform', '-translate-y-2') // 鼠标经过时上浮并放大
      })
      el.addEventListener('mouseleave', () => {
        el.classList.remove('transform', '-translate-y-2') // 鼠标离开时复位
      })
    }
  }
}

export default {
  install(app: App) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  }
}
