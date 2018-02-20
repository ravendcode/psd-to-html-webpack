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

const extractPcss = new ExtractTextPlugin({
  filename: 'css/bundle.css',
});

const minify = {
  removeAttributeQuotes: false,
  collapseWhitespace: true,
  html5: true,
  minifyCSS: true,
  removeComments: true,
  removeEmptyAttributes: true,
};

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    config: {
      ctx: {
        cssnano: { env },
      },
    },
  },
};

const includePages = [
  'about.html',
  'users.html',
];

const webpackConfig = {
  entry: {
    // bundle: [
    //   './src/js/main.js',
    //   './src/scss/main.scss',
    // ],
    vendor: ['jquery'],
    common: ['./src/js/common.js', './src/scss/main.scss'],
    home: './src/js/pages/home.js',
    about: './src/js/pages/about.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    // publicPath: '/',
    library: 'app',
  },
  devtool: 'source-map',
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
    extractPcss,
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
      test: /\.pcss$/,
      use: extractPcss.extract({
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        }, postCssLoader],
        fallback: 'style-loader',
      }),
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
      },
    }, {
      test: /\.s[ac]ss$/,
      use: extractSass.extract({
        use: [
          'css-loader',
          postCssLoader,
          'sass-loader',
        ],
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

includeHtml(includePages);

module.exports = webpackConfig;
