module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    // Add plugins here if you want to in the future
    '@babel/plugin-proposal-private-property-in-object', { 'loose': true }
  ],
  // add your custom rules here
  rules: {
    semi: ['error', 'always', { omitLastInOneLineBlock: true }],
    'vue/html-self-closing': 0,
    'vue/no-v-html': 0,
    'no-console': 'off',
    'no-unused-vars': 'warn'
  }
};
