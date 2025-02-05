import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

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
        'data-theme': 'light',
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
          content: 'https://classicminidiy.s3.us-east-1.amazonaws.com/misc/seo-images/avatar.jpg',
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
        { rel: 'preconnect preconnect preload dns-prefetch', href: 'https://use.typekit.net' },
        {
          rel: 'stylesheet',
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
  },

  site: {
    url: 'https://classicminidiy.com',
    name: 'One of the most important parts of Classic Mini DIY is the focus on getting out and working on your own car. So to make this easier for you, I have collected technical information from various sources and consolidated it right here on classicminidiy.com',
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  /*
   ** Global CSS
   */
  css: ['@/assets/main.scss', 'vuetify/lib/styles/main.sass'],

  /*
   ** Plugins to load before mounting the App
   */
  modules: [
    '@nuxtjs/fontaine',
    '@vite-pwa/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/content',
    '@nuxt/image',
    ['nuxt-gtag', { id: 'G-FBH0E64HM1' }],
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],

  content: {
    database: {
      type: 'postgres',
      url: process.env.POSTGRES_POSTGRES_URL || '',
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/archive': { prerender: true },
    '/archive/engines': { prerender: true },
    '/archive/registry': { prerender: true },
    '/maps': { prerender: true },
    '/privacy': { prerender: true },
    '/technical/parts': { prerender: true },
    '/technical/torque': { prerender: true },
  },

  robots: {
    // provide simple disallow rules for all robots `user-agent: *`
    disallow: ['/assets/', '/data/', '/server/', '/store/', '/plugins/'],
  },

  plugins: ['~/plugins/vuetify.ts', { src: '~/plugins/highcharts.ts', mode: 'client' }],

  runtimeConfig: {
    public: {
      s3BaseURL: process.env.s3Base,
      serverlessEndpoint: process.env.serverlessEndpoint,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.classicminidiy.com',
    },
    app: {
      githubAPIKey: process.env.githubAPIKey,
      GITLAB: process.env.GITLAB,
      youtubeAPIKey: process.env.youtubeAPIKey,
      aws_access_key_id: process.env.aws_access_key_id,
      aws_secret_access_key: process.env.aws_secret_access_key,
      validation_key: process.env.validation_key,
      CMDIY_NAMEPSACE: process.env.CMDIY_NAMEPSACE,
      POSTGRES_POSTGRES_URL: process.env.POSTGRES_URL || '',
    },
  },

  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    vue: {
      template: {
        transformAssetUrls,
      },
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
    selfDestroying: true,
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
    },
  },
  compatibilityDate: '2024-08-29',
});
