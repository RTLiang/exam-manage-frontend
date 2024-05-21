// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  router: {
    routes: [
      {
        path: '/',
        name: 'home',
        component: '/pages/index.vue'
      }
      // {
      //   path: '/about',
      //   name: 'about',
      //   component: '~/pages/about.vue'
      // }
    ]
  },
  modules: [
    '@element-plus/nuxt'
  ],
  elementPlus: { /** Options */ },
  axios: {
    baseURL: 'http://localhost:8080', // Your Spring Boot API URL
  },
})