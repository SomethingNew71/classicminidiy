export default defineNuxtConfig({
  /*
   ** Headers of the page
   */
  ssr: true,
  app: {
    head: {
      title: 'Classic Mini DIY',
      htmlAttrs: {
        lang: 'en',
        prefix: 'og: https://ogp.me/ns#',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: process.env.npm_package_description || '',
        },
        {
          property: 'og:title',
          content: 'Classic Mini DIY',
        },
        {
          property: 'og:image',
          content: 'https://classicminidiy.com/seo-images/avatar.jpg',
        },
        {
          property: 'fb:pages',
          content: '615159745295369',
        },
        {
          name: 'facebook-domain-verification',
          content: 'hiuvhh3rwnxby3zewibo4t94tapz6u',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-32x32.png',
          sizes: '32x32',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-16x16.png',
          sizes: '16x16',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet preconnect dns-prefetch',
          href: 'https://use.typekit.net/fgm1hlg.css',
          media: 'print',
          onload: 'this.media="all"',
        },
      ],
      script: [
        {
          src: 'https://kit.fontawesome.com/4e4435c885.js',
          crossorigin: 'anonymous',
        },
        {
          async: true,
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0523971861051053',
          crossorigin: 'anonymous',
        },
      ],
    },
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/oruga.js',
    { src: '~/plugins/highcharts.js', mode: 'client' },
    { src: '~/plugins/vue-navigation-bar.js', mode: 'client' },
    { src: '~/plugins/vue-gtag.js', mode: 'client' },
    // { src: '~/plugins/vue-google-adsense', mode: 'client' },
  ],
  runtimeConfig: {
    public: {
      s3BaseURL: process.env.s3Base,
      serverlessEndpoint: process.env.serverlessEndpoint,
    },
  },
});