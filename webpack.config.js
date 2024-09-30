// webpack.config.js
// path.resolve(__dirname, 'client/src/legacy')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/src/app.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: [/node_modules/],
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client', 'public', 'index.html'),
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'eval-source-map', // 소스 맵 생성
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client', 'dist'),
  },
  devServer: {
    compress: true,
    port: 9000,
    client: {
      logging: 'none', // 로그 출력 안 하도록 설정
    },
  },
};
