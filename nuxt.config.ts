// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'arco-design-nuxt-module',
    '@vueuse/nuxt',
    '@nuxt/content'
  ],
  css: ['animate.css', '@/main.css', '@/assets/css/transition.css', '@/assets/css/content.css'],
  arco: {
    importPrefix: 'A',
    hookPrefix: 'Arco',
  },
  imports: {
    dirs: [
      'constants/**'
    ]
  },
  content: {
    highlight: {
      theme: 'monokai'
    }
  },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/wonderland/' : '/',
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico', // 这里是 favicon 的路径
        },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'UTF-8' }
      ],
    },
  },
  routeRules: {
    '/list': { redirect: '/list/fe-develop/articles' },
  }
})
