module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    semi: ['error', 'always', { omitLastInOneLineBlock: true }],
    'vue/html-self-closing': 0,
    'vue/no-v-html': 0,
    'no-console': 'off',
    'no-unused-vars': 'warn',
  },
};
