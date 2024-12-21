import pkg from './package.json'

console.table([{
  version: pkg.version,
  // eslint-disable-next-line node/prefer-global/process
  mode: process.env.NODE_ENV,
}])

const {
  NUXT_PUBLIC_API_BASEURL,
  NUXT_PUBLIC_COOKIE_DOMAIN,
  NUXT_PUBLIC_COOKIE_PATH,
  NUXT_PUBLIC_COOKIE_SAMESITE,
  NUXT_PUBLIC_DELETE_CONSOLE,
  NUXT_PUBLIC_TITLE,
  NUXT_PUBLIC_PREFIX,
  NUXT_PUBLIC_PREVIEW_BASEURL,
} = import.meta.env

console.table({
  NUXT_PUBLIC_API_BASEURL,
  NUXT_PUBLIC_COOKIE_DOMAIN,
  NUXT_PUBLIC_COOKIE_PATH,
  NUXT_PUBLIC_COOKIE_SAMESITE,
  NUXT_PUBLIC_DELETE_CONSOLE,
  NUXT_PUBLIC_TITLE,
  NUXT_PUBLIC_PREFIX,
  NUXT_PUBLIC_PREVIEW_BASEURL,
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  typescript: { strict: false, shim: false },
  imports: { dirs: ['types', 'stores', 'api'] },
  modules: ['@nuxt/eslint', '@unocss/nuxt', '@vueuse/nuxt', '@element-plus/nuxt', 'dayjs-nuxt', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
  },
  unocss: {
    nuxtLayers: true,
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  dayjs: {
    plugins: ['duration', 'relativeTime'],
    locales: ['en', 'zh-cn'],
  },
  css: ['@unocss/reset/normalize.css', '@unocss/reset/sanitize/sanitize.css', '@unocss/reset/sanitize/assets.css', '~/assets/scss/element/main.scss', '~/assets/scss/index.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "~/assets/scss/element/index.scss" as element;`,
        },
      },
    },
    build: {
      // chunkSizeWarningLimit: 2000,
      // commonjsOptions: { transformMixedEsModules: true },
    },
    esbuild: {
      drop: NUXT_PUBLIC_DELETE_CONSOLE === 'true' ? ['console', 'debugger'] : [],
    },
  },
  app: {
    head: {
      title: '',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        { name: 'keywords', content: '网站，后台，开发，外包，服务，公司，官网' },
        { name: 'description', content: '春花，秋月，夏日，冬雪。你若盛开，清风自来。心若浮沉，浅笑安然。' },
        { name: 'format-detection', content: 'telephone=no' },
        // pc 等比例缩放
        // { name: 'viewport', content: 'user-scalable=yes' },
        // { name: 'naive-ui-style' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // <p class="ql-editor" v-html="info.content"></p>
        // { rel: 'stylesheet', href: '//cdn.quilljs.com/1.3.6/quill.core.css' },
        // { rel: 'stylesheet', href: '//cdn.quilljs.com/1.3.6/quill.snow.css' },
        // { rel: 'stylesheet', href: '//cdn.quilljs.com/1.3.6/quill.bubble.css' },
      ],
      style: [],
      script: [
        // { src: '//cdn.jsdelivr.net/npm/eruda', type: 'text/javascript' },
        // { children: 'eruda.init();', type: 'text/javascript' }
      ],
      noscript: [{ children: 'JavaScript is required' }],
    },
  },
  piniaPluginPersistedstate: {
    cookieOptions: {
      domain: NUXT_PUBLIC_COOKIE_DOMAIN,
      path: NUXT_PUBLIC_COOKIE_PATH,
      sameSite: NUXT_PUBLIC_COOKIE_SAMESITE,
    },
  },
  runtimeConfig: {
    version: pkg.version,
    public: {
      version: pkg.version,
      title: '',
      prefix: '',
      api: {
        baseUrl: '',
      },
      preview: {
        baseUrl: '',
      },
    },
  },
  nitro: {
    devProxy: {
      [NUXT_PUBLIC_PREFIX]: {
        target: NUXT_PUBLIC_API_BASEURL,
        changeOrigin: true,
        secure: false,
        ws: true,
        prependPath: true,
      },
    },
    routeRules: {
      [`${NUXT_PUBLIC_PREFIX}/**`]: {
        proxy: `${NUXT_PUBLIC_API_BASEURL}/**`,
      },
    },
  },
})
