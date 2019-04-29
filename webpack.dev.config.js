var path = require('path')
var webpack = require('webpack')
var CONFIG = require('./CONFIG')

module.exports = {
  entry:
  {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      './app'
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: [ 'babel-loader?presets[]=react,presets[]=es2015' ]
      },
      {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR (Hot Module Reload)
    new webpack.ProvidePlugin({
      jQuery: 'jQuery',
      $: 'jQuery',
      jquery: 'jQuery'
    })
  ],
  resolve: {
    alias: {
      jQuery: require.resolve('jquery')
    }
  },
  devServer: {
    hot: true,
    contentBase: __dirname,
    historyApiFallback: true,
    compress: true,
    publicPath: '/dist',
    host : "0.0.0.0",
    port: CONFIG.APP_PORT
    // content base for changing its content base
  }
}
