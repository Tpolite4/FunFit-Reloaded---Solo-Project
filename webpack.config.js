const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.tsx',
  //   src/client/index.tsx

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },

  plugins: [new HTMLWebpackPlugin({ template: './src/index.html' })],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/i,
        use: [{ loader: 'css-loader', options: { url: false } }],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              // name: '[path][name].[ext]', // You can customize the name and path of the output
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    port: '8000',
    // proxy: {
    //   '/api': 'http://localhost:3000',
    //   secure: false,
    // }, DEAL WITH LATER
  },
};
