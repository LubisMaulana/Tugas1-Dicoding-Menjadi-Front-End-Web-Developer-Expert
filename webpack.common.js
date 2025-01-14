const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const autoprefixer = require('autoprefixer');
module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
		rules: [{
			test: /\.(scss)$/,
			use: [
				{
					loader: 'style-loader'
				},
				{
					loader: 'css-loader'
				},
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [
								autoprefixer
							]
						}
					}
				},
				{
					loader: 'sass-loader'
				}
			]
		}, {
			test: /\.css$/i,
			exclude: /styles/,
			use: ['to-string-loader', 'css-loader']
		}]
	},
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
  ],
};
