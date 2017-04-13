module.exports = {
  extends: 'standard',
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    // ecmaFeatures: {
    //   classes: true
    // }
  },
  parser: 'babel-eslint',
  root: true,
  // required to lint *.vue files
  plugins: [
    'html',
    // 'import'
  ],
  // add your custom rules here
  rules: {
    semi: [ "error", "always" ]
  },
  globals: {}
}
