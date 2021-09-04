import redirectSSL from 'redirect-ssl';

require('dotenv').config();

export default {
  /*
   ** Headers of the page
   */
  target: 'static',
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
      },
      {
        property: 'fb:pages',
        content: '615159745295369'
      },
      {
        name: 'facebook-domain-verification',
        content: 'hiuvhh3rwnxby3zewibo4t94tapz6u'
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
    '~/plugins/vue-debounce.js',
    { src: '~plugins/highcharts-vue.js', mode: 'client' },
    { src: '~plugins/vue-navigation-bar.js', mode: 'client' },
    { src: '~/plugins/vue-gtag.js', mode: 'client' },
    { src: '~/plugins/vue-cookie-law.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-compress',
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/robots',
    'nuxt-facebook-pixel-module',
    '@nuxtjs/sitemap'
  ],
  robots: {
    UserAgent: '*',
    Disallow: '/assets/'
  },
  sitemap: {
    hostname: 'https://classicminidiy.com',
    gzip: true
  },
  serverMiddleware: [
    // Will register redirect-ssl npm package
    redirectSSL.create({ enabled: process.env.NODE_ENV === 'production' }),
    // Will handle all external API calls
    { path: 'api', handler: '~/api/index.js' }
  ],
  // 'google-gtag': {
  //   // TODO: Implement this new tag when gtag supports it.
  //   // id: 'G-FBH0E64HM1',
  //   id: 'UA-53914731-2',
  //   config: {
  //     linker: {
  //       accept_incoming: true,
  //       domains: [
  //         'patreon.com/classicminidiy',
  //         'facebook.com/classicminidiy',
  //         'youtube.com/c/classicminidiy',
  //         'merch.classicminidiy.com'
  //       ]
  //     }
  //   }
  // },
  facebook: {
    pixelId: '3553629671319283',
    autoPageView: true
  },
  build: {
    optimizeCSS: true
  },
  env: {
    s3BaseURL: process.env.s3Base
  }
};
