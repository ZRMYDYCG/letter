import type { App, Directive } from 'vue'

interface IDirectives {
  [key: string]: Directive
}

const directives: IDirectives = {}

export default {
  install(app: App) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  }
}
