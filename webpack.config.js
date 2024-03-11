import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default () => {
  return {
    mode: 'production',
    entry: './src/index.js',
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                '@babel/preset-react',
              ],
            },
          },
        },
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[hash].[ext]',
                outputPath: 'images',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new MiniCssExtractPlugin(),
    ],
  };
};
