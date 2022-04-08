const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const { NODE_ENV } = process.env;
const isDev = NODE_ENV !== 'production' && NODE_ENV !== 'ci';

const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name]-[contenthash].css',
    chunkFilename: '[name]-[chunkhash].css'
  }),
  new HtmlWebpackPlugin({
    template: './public/index.html'
  })
];

module.exports = {
  entry: './src/client/index.tsx',
  mode: isDev ? 'development' : 'production',
  output: {
    publicPath: isDev ? '/' : '/static/',
    path: path.join(__dirname, 'dist/client'),
    filename: './js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset'
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { publicPath: '' } },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.jsx?|\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: plugins,

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  optimization: {
    minimize: isDev ? false : true,
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  devtool: 'source-map',
  devServer: {
    port: 9000,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/'
    },
    proxy: {
      '/api/**': {
        target: 'http://localhost:8050',
        secure: false,
        changeOrigin: true
      }
    }
  }
};
