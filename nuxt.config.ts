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
          rel: 'stylesheet preconnect preload dns-prefetch',
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
      ],
    },
    // pageTransition: { name: 'page', mode: 'out-in' },
  },

  /*
   ** Global CSS
   */
  css: ['@/assets/main.scss', 'vuetify/lib/styles/main.sass'],

  /*
   ** Plugins to load before mounting the App
   */
  modules: [
    '@nuxt/content',
    '@nuxtjs/fontaine',
    [
      'nuxt-disqus',
      {
        shortname: 'classicminidiy',
      },
    ],
    '@vite-pwa/nuxt',
    'nuxt-simple-sitemap',
    'nuxt-simple-robots',
    '@nuxt/image',
    ['nuxt-gtag', { id: 'G-FBH0E64HM1' }],
  ],

  // nitro: {
  //   prerender: {
  //     crawlLinks: true,
  //     routes: ['/', 'sitemap.xml'],
  //     ignore: [],
  //   },
  // },

  robots: {
    // provide simple disallow rules for all robots `user-agent: *`
    disallow: ['/assets/', '/data/', '/server/', '/store/', '/plugins/'],
  },

  plugins: ['~/plugins/oruga.ts', '~/plugins/vuetify.ts', { src: '~/plugins/highcharts.ts', mode: 'client' }],

  runtimeConfig: {
    public: {
      s3BaseURL: process.env.s3Base,
      serverlessEndpoint: process.env.serverlessEndpoint,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.classicminidiy.com',
    },
    app: {
      githubAPIKey: process.env.githubAPIKey,
      youtubeAPIKey: process.env.youtubeAPIKey,
      aws_access_key_id: process.env.aws_access_key_id,
      aws_secret_access_key: process.env.aws_secret_access_key,
      validation_key: process.env.validation_key,
      recaptchaSite: process.env.recaptchaSite,
      recaptchaSiteV2: process.env.recaptchaSite,
      recaptchaSecret: process.env.recaptchaSecret,
      recaptchaSecretV2: process.env.recaptchaSecret,
    },
  },

  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Classic Mini Toolbox',
      short_name: 'CMDIY Toolbox',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'icon.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
    },
  },
});
