// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/src/app.ts',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'client/src/legacy.ts'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
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
