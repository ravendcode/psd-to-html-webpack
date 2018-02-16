module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    'jquery': true,
  },
  extends: 'airbnb-base',
  plugins: [
    'html',
  ],
  rules: {
    'no-console': 1,
  }
};
