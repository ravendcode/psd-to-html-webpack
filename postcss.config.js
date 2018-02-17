module.exports = ({ env }) => ({
  // parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {},
    'rucksack-css': {},
    lost: {},
    cssnano: env.NODE_ENV === 'production',
  },
});
