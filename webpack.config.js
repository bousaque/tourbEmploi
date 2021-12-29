const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app/app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })],
  devServer: {
    static: './dist',
  },
};