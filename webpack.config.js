// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    open: true,
    host: 'localhost'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new StringReplacePlugin()
    // Add your plugins here
    // Learn more obout plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
        type: 'asset'
      },
      {
        enforce: 'pre',
        test: /unicode-properties[\/\\]unicode-properties/,
        use: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: "var fs = _interopDefault(require('fs'));",
              replacement: function () {
                return "var fs = require('fs');";
              }
            }
          ]
        })
      },
      {
        test: /unicode-properties[\/\\]unicode-properties/,
        use: 'transform-loader?brfs'
      },
      { test: /pdfkit[/\\]js[/\\]/, use: 'transform-loader?brfs' },
      { test: /fontkit[\/\\]index.js$/, use: 'transform-loader?brfs' },
      {
        test: /linebreak[\/\\]src[\/\\]linebreaker.js/,
        use: 'transform-loader?brfs'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'unicode-properties': 'unicode-properties/unicode-properties.cjs.js',
      pdfkit: 'pdfkit/js/pdfkit.js',
      joi: '../node_modules/joi/lib/index'
    }
  },
  target: 'node'
};
