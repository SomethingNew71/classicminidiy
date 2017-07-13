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
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'favicon/favicon-16x16.png' },
      { rel: 'icon', type: 'image/x-icon', href: 'favicon/favicon.ico' }
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ],
    script: [
      { async: true, src: 'https://use.fontawesome.com/3d93f1904c.js' },
      { async: true, src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#279bfb' },
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
    { src: '~plugins/vuetify.js' },
    { src: '~plugins/analytics.js', ssr: false },
    { src: '~plugins/ads.js', ssr: false }
  ],
  css: [
    { src: '~assets/styles/app.styl', lang: 'styl' }
  ]
};
