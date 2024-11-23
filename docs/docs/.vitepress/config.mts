import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "YQ-Message-Wall-Docs",
  description: "@2024 软件实验室",
  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '迭代日志', link: '/version' }
    ],

    sidebar: {
      '/': [
        {
          text: '首页',
          link: '/',
        },
        {
          text: '迭代日志',
          link: '/version',
        }
      ]
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ZRMYDYCG/YQ-Message-Wall' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © @yq-yq-message-wall 2024'
    }
  }
})
