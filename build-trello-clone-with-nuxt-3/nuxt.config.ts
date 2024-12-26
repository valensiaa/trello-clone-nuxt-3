// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/vello.css'],
  modules: ['@pinia/nuxt', '@nuxt/ui', '@vueuse/nuxt'],
  colorMode: {
    preference: 'light'
  }
})