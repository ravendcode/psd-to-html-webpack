const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
};

const extractSass = new ExtractTextPlugin({
  filename: 'css/bundle.css',
});

const minify = {
  removeAttributeQuotes: false,
  collapseWhitespace: false,
  html5: true,
  minifyCSS: true,
  removeComments: false,
  removeEmptyAttributes: true,
};

const webpackConfig = {
  // entry: './src/js/main.js',
  entry: {
    bundle: [
      './src/js/main.js',
      './src/scss/main.scss',
    ],
    vendor: ['jquery'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    // publicPath: '/',
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    extractSass,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false,
      minify,
    }),
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
      },
    }, {
      test: /\.s[ac]ss$/,
      use: extractSass.extract({
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
        fallback: 'style-loader',
      }),
    }, {
      test: /\.html$/,
      use: ['html-loader'],
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img/',
        },
      }, {
        loader: 'img-loader',
      }],
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: ['file-loader'],
    }],
  },
};

function includeHtml(files) {
  for (let index = 0; index < files.length; index += 1) {
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      filename: files[index],
      template: `src/${files[index]}`,
      minify,
      inject: false,
    }));
  }
}

includeHtml([
  'about.html',
  'users.html',
]);

module.exports = webpackConfig;
