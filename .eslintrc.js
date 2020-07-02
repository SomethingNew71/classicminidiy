module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    semi: ['error', 'always', { omitLastInOneLineBlock: true }],
    'vue/html-self-closing': 0,
    'vue/no-v-html': 0,
    'no-console': [
      'error',
      { allow: ['warn', 'error'] }
    ]
  }
};
