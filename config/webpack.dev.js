const path = require('path');
// const os = require('os');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// const threads=os.cpus().length-1;

module.exports = {
  // 入口用相对路径
  entry: './src/main.js',
  // 输出用绝对路径
  // output: {
  //     path: path.resolve(__dirname, "dist"),
  //     // 入口文件的输出路径
  //     filename: "static/js/main.js",
  //     // 清除上一次打包的内容
  //     clean: true,
  // },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            // 从右往左
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.less$/i,
            use: ['style-loader', 'css-loader', 'less-loader'],
          },
          {
            test: /\.(jpe?g|png|gif|webp)$/i,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 4 * 1024, // 4kb
              },
            },
            generator: {
              filename: 'static/images/[hash:10][ext][query]',
            },
          },
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'static/media/[hash:10][ext][query]',
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  // presets: ['@babel/preset-env'],
                  cacheDirectory: true,
                  cacheCompression: false,
                  plugins: ['react-refresh/babel'],
                },
              },
              // {
              //     // babel开启多进程打包
              //     loader: "thread-loader",
              //     options: {
              //         workers: threads,
              //     }
              // }
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      cache: true,
      // cacheLocation: path.resolve(__dirname,'../node_modules/.cache/eslintcache'),
      // eslint开启多进程打包
      // threads
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    // hot: true, // 默认值
    historyApiFallback: true, // 解决前端路由刷新404问题
  },
  mode: 'development',
  devtool: 'eval-source-map',
};
