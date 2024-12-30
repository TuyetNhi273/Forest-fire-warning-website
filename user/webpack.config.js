// webpack.config.js

const Dotenv = require('dotenv-webpack');

module.exports = {
    module: {
      rules: [
        {
          test: /\.swf$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'flash/'
          }
        }
      ],
      plugins: [
        new Dotenv()
      ]
    }
  };
  