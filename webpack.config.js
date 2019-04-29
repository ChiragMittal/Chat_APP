var path = require('path')
var webpack = require('webpack')

//import HtmlWebpackPlugin from "html-webpack-plugin";

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
    publicPath: '/dist'
  },
  mode: process.env.NODE_ENV || 'development',
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: path.join(__dirname,'index.html')
  //   })
  // ],
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
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: ["file-loader"]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  devServer: {
    hot: true,
    contentBase: __dirname,
    historyApiFallback: true,
    compress: true,
    publicPath: '/dist',
    port: 8000
    // content base for changing its content base
  }
};
