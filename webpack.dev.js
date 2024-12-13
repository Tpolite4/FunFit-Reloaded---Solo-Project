const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.config');
module.exports = merge(webpackConfig, {
  mode: 'development',
  entry: './src/client/index.tsx',
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: ['style-loader', 'css-loader'], // Applies loaders in reverse order
  //     },
  //   ],
  // },
});
