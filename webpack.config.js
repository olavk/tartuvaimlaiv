const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: './app.js',
    backend: './backend.js',
  },
  output: {
    path: __dirname + '/dist', // `dist` is the destination
    filename: '[name].bundle.js',
    publicPath: '/dist',
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src/'),
      'utils': path.resolve(__dirname, 'src/utils/'),
      'modules': path.resolve(__dirname, 'src/redux/modules/'),
      'components': path.resolve(__dirname, 'src/Components/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['babel-preset-es2015'].map(require.resolve),
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
        }),
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          {
            loader: 'file-loader',
            query: {
              name: '[name]_[md5:hash:hex:6].[ext]',
              publicPath: '/dist/',
            }
          },
          {loader: 'image-webpack-loader'},
        ],
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({filename: 'style.css'}),
  ],
  devServer: {
    contentBase: __dirname,
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  devtool: "eval-source-map", // Default development sourcemap
};

if (process.env.NODE_ENV === "production") {
  config.devtool = "source-map";
  // Can do more here
  // JSUglify plugin
  // Offline plugin
  // Bundle styles seperatly using plugins etc,
}

module.exports = config;
