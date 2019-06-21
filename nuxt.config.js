export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Classic Mini DIY',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/fgm1hlg.css' }
    ],
    script: [{ src: 'https://kit.fontawesome.com/4e4435c885.js' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/buefy.js'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    // 'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
    '@bazzite/nuxt-optimized-images'
  ],
  googleAnalytics: {
    id: 'UA-53914731-2'
  },
  optimizedImages: {
    optimizeImages: true
  },
  // buefy: {
  //   materialDesignIcons: false
  // },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
