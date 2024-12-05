import type { App, Directive } from 'vue'
import vFocus from './modules/v-focus.ts'

interface IDirectives {
  [key: string]: Directive
}

const directives: IDirectives = {
  vFocus
}

export default {
  install(app: App) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  }
}
