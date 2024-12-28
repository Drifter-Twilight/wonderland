// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'arco-design-nuxt-module',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@sidebase/nuxt-auth'
  ],
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: process.env.NUXT_AUTH_ORIGIN,
    baseURL: 'https://drifter-twilight.github.io/wonderland/api/auth',
    provider: { 
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'github',
      addDefaultCallbackUrl: true
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    }
  },
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
      theme: 'github-light'
    }
  },
  devServer: {
    url: "http://localhost:5000"
  },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/wonderland/' : '/'
  },
  runtimeConfig: {
    authSecret: '',
    authOrigin: '',
    clientId: '',
    clientSecret: '',
  }
})
