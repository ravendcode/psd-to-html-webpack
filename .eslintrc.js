module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    // ecmaVersion: 2017,
    // ecmaFeatures: {
    //   'jsx': true
    // },
  },
  env: {
    browser: true,
    jquery: true,
    mocha: true,
    node: true,
  },
  globals: {
    io: true,
    moment: true,
    Mustache: true,
    Promise: true,
  },
  extends: 'airbnb-base',
  plugins: [
    'html',
  ],
  rules: {
    'no-console': 1,
    'import/no-extraneous-dependencies': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/no-unresolved': 0,
  }
};
