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
    ],
    script: [
      { src: 'https://use.fontawesome.com/3d93f1904c.js' }
      // {
      //   src: 'https://code.jquery.com/jquery-3.2.1.min.js',
      //   integrity: 'sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=',
      //   crossorigin: 'anonymous'
      // }
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
    vendor: [
      // 'a/thing'
    ],
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
  }
};
