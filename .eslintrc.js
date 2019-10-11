module.exports = {
  env: {
    browser: true,
    es6: true,
    jasmine: true,
    jest: true,
  },
  extends: ["airbnb-typescript"],
  globals: {
    $: true,
    $$: true,
    Atomics: 'readonly',
    browser: true,
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-plusplus': 'off',
    'react/forbid-prop-types': 'off',
    'implicit-arrow-linebreak': 'off',
    'react/button-has-type': 'off',
    'react/default-props-match-prop-type': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/destructuring-assignment': [
      'error',
      'always',
      { ignoreClassFields: true },
    ],
    'id-length': ['error', { min: 3, exceptions: ['id'] }]
  }
}