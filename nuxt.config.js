module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Classic Mini DIY | The Best Classic Mini Source',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Classic Mini DIY Knowledgebase' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/icons/preview.png' },
      { rel: 'image_src', href: '/static' },
      { href: 'https://fonts.googleapis.com/css?family=Oxygen:300,400,700', rel: 'stylesheet' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ],
    script: [
      { async: true, src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' },
      { defer: true, src: 'https://pro.fontawesome.com/releases/v5.0.9/js/all.js', integrity: 'sha384-DtPgXIYsUR6lLmJK14ZNUi11aAoezQtw4ut26Zwy9/6QXHH8W3+gjrRDT+lHiiW4', crossorigin: 'anonymous' },
      { defer: true, src: 'https://use.fontawesome.com/releases/v5.0.9/js/v4-shims.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#659BC8' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vuetify', 'axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  plugins: [
    { src: '~/plugins/plugins.js' }
  ],
  css: [
    { src: '~/node_modules/vuetify/dist/vuetify.min.css', lang: 'css' }
  ],
  modules: [
    ['@nuxtjs/google-analytics', { ua: 'UA-53914731-2' }]
  ]
};
