// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'arco-design-nuxt-module',
    '@vueuse/nuxt',
  ],
  css: ['animate.css', '@/main.css', '@/assets/css/transition.css'],
  arco: {
    importPrefix: 'A',
    hookPrefix: 'Arco',
  },
  imports: {
    dirs: [
      'constants/**'
    ]
  }
})
