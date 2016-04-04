module.exports = {
  'rules': {
    'no-extra-parens': [2, 'all'],
    'no-unexpected-multiline': 2,
    'consistent-return': 2,
    'dot-location': [2, 'property'],
    'dot-notation': 2,
    'eqeqeq': 2,
    // Enforce some JS best practices
    'no-caller': 2,
    'no-const-assign': 2,
    'no-else-return': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-extend-native': 2,
    'no-floating-decimal': 2,
    'no-labels': 2,
    'no-lone-blocks': 2,
    'no-loop-func': 2,
    'no-nested-ternary': 2,
    'no-native-reassign': 2,
    'no-new-func': 2,
    'no-new-wrappers': 2,
    'no-unused-vars': 2,
    'no-undef': 2,
    'vars-on-top': 2,
    'default-case': 2,
    // Disallow reassigning params, but allow object property modification
    'no-param-reassign': [2, { 'props': false }],
    'no-proto': 2,
    'no-return-assign': 2,
    'no-script-url': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    // Disallow useless expressions but short circuiting and ternarys OK
    'no-unused-expressions': [2, { 'allowShortCircuit': true, 'allowTernary': true }],
    'no-useless-concat': 2,
    'no-use-before-define': 0,
    'no-void': 2,
    'no-with': 2,
    'yoda': 2,
    'radix': [2, 'always'],
    'wrap-iife': [2, 'inside'],
    'block-spacing': 2,
    // Enforce 1 true brace style (brace on same line, end on new line)
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
    // Enforce camelCase naming
    'camelcase': [2, { 'properties': 'always' }],
    // Enforce spacing after commas and never before
    'comma-spacing': [2, { 'before': false, 'after': true }],
    'comma-style': [2, 'last'],
    'comma-dangle': 2,
    // Always require curlies to denote blocks
    'curly': [2, 'all'],
    // Enforce a newline at the end of files
    'eol-last': 2,
    'func-style': [2, 'declaration'],
    // Enforce 2 space, space indentation
    'indent': [2, 2],
    'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }],
    // Remove all Line ending rules
    'linebreak-style': [0],
    // Require a capital letter to distinguish constructors
    'new-cap': 2,
    // Enforce array literal construction
    'no-array-constructor': 2,
    'no-lonely-if': 2,
    // Enforce object literal construction
    'no-new-object': 2,
    'no-underscore-dangle': 2,
    'no-trailing-spaces': 2,
    'object-curly-spacing': [2, 'always'],
    // Disallow multiple variable initializations with one keyword
    'one-var': [2, 'never'],
    // Enforce single quotes
    'quotes': [2, 'single'],
    'quote-props': 0,
    'semi-spacing': [2, { 'before': false, 'after': true }],
    // Always require semicolons
    'semi': [2, 'always'],
    // Enforce spacing between most keywords and symbols
    'keyword-spacing': [2, 'always'],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'always'],
    'space-infix-ops': [2, { 'int32Hint': false }],
    'keyword-spacing': 2,
    'space-unary-ops': [2, { 'words': true, 'nonwords': false }],
    'spaced-comment': [2, 'always'],
    'padded-blocks': 2,
    'max-len': 0,
    // Prefer function-level in the browser and global in Node-like envs
    'strict': [2, 'global'],
    // Disallow assigning variables using restricted names
    'no-shadow': 2,
    'no-shadow-restricted-names': 2,
    'arrow-spacing': [2, { 'before': true, 'after': true }],
    'generator-star-spacing': [2, { 'before': true, 'after': true }],
    // Detect arrow function arrows accidentally used in conditionals
    'no-constant-condition': 2,
    'no-class-assign': 2,
    'no-dupe-class-members': 2,
    // Disallow vars; leaky and let/const should cover all use cases
    'no-var': 2,
    'object-shorthand': 2,
    'prefer-const': 1,
    'prefer-template': 2,
    'prefer-arrow-callback': 2,

    'no-unneeded-ternary': 2
  },
  'env': {
    'es6': true,
    'node': true,
    'browser': true,
    'jasmine': true,
  },
  // Some common globals in browser environments
  'globals': {
    'angular': false,
    'ngDescribe': false,
    'it': false,
    'sinon': true,
  },
  // Include all the recommended rules, most for error-avoidance and best
  // practices
  'extends': 'airbnb',
};
