import redirectSSL from 'redirect-ssl';

require('dotenv').config();

export default {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Classic Mini DIY',
    htmlAttrs: {
      lang: 'en',
      prefix: 'og: https://ogp.me/ns#'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        property: 'og:title',
        content: 'Classic Mini DIY'
      },
      {
        property: 'og:image',
        content: 'https://classicminidiy.com/seo-images/avatar.jpg'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet preconnect dns-prefetch', href: 'https://use.typekit.net/fgm1hlg.css', media: 'print', onload: 'this.media="all"' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/main.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/buefy.js',
    { src: '~plugins/vue-highcharts.js', ssr: false },
    { src: '~plugins/vue-navigation-bar.js', ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@aceforth/nuxt-optimized-images',
    'nuxt-compress',
    '@nuxtjs/robots',
    '@nuxtjs/google-analytics'
  ],
  robots: {
    UserAgent: '*',
    Disallow: '/assets/'
  },
  serverMiddleware: [
    // Will register redirect-ssl npm package
    redirectSSL.create({ enabled: process.env.NODE_ENV === 'production' })
  ],
  googleAnalytics: {
    id: 'G-FBH0E64HM1'
  },
  optimizedImages: {
    optimizeImages: true
  },
  build: {
    optimizeCSS: true
  },
  env: {
    s3BaseURL: 'https://classicminidiy-images.s3.amazonaws.com/',
    youtube: {
      key: process.env.YoutubeKey,
      id: process.env.YoutubeID
    }
  }
};
