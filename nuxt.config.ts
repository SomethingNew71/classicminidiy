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
          content:
            'One of the most important parts of Classic Mini DIY is the focus on getting out and working on your own car. So to make this easier for you, I have collected technical information from various sources and consolidated it right here on classicminidiy.com',
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
    // pageTransition: { name: 'page', mode: 'out-in' },
  },

  /*
   ** Global CSS
   */
  css: ['@/assets/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  modules: [
    [
      '@nuxtjs/robots',
      {
        Disallow: ['/assets/', '/data/', '/server/', '/store/', '/plugins/'],
      },
    ],
    'nuxt-simple-sitemap',
    [
      '@nuxtjs/html-validator',
      {
        usePrettier: false,
        options: {
          rules: {
            'svg-focusable': 'off',
            'no-unknown-elements': 'error',
            // Conflicts or not needed as we use prettier formatting
            'void-style': 'off',
            'no-trailing-whitespace': 'off',
            // Conflict with Nuxt defaults
            'require-sri': 'off',
            'attribute-boolean-style': 'off',
            'doctype-style': 'off',
            // Unreasonable rule
            'no-autoplay': 'off',
          },
        },
      },
    ],
    '@nuxt/image',
    [
      'nuxt-gtag',
      {
        id: 'G-FBH0E64HM1',
      },
    ],
  ],

  plugins: [
    '~/plugins/oruga.js',
    { src: '~/plugins/highcharts.js', mode: 'client' },
    { src: '~/plugins/vue-navigation-bar.js', mode: 'client' },
  ],

  runtimeConfig: {
    public: {
      s3BaseURL: process.env.s3Base,
      serverlessEndpoint: process.env.serverlessEndpoint,
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL || 'https://www.classicminidiy.com',
    },
    app: {
      githubAPIKey: process.env.githubAPIKey,
      youtubeAPIKey: process.env.youtubeAPIKey,
    },
  },

  devtools: {
    enabled: true,
  },
});
