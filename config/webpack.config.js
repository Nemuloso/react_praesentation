const path = require('path');
module.exports = {
  entry: './src/index.js',
  
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  
  watchOptions: {
    ignored: ['dist', 'node_modules']
  },
  watch: true,
  
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
