const path = require('path');
const os = require('os');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const threads = os.cpus().length - 1;

function getStyleLoader(preLoader) {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [['postcss-preset-env']],
        },
      },
    },
    preLoader,
  ].filter(Boolean);
}

module.exports = {
  // 入口用相对路径
  entry: './src/main.js',
  // 输出用绝对路径
  output: {
    path: path.resolve(__dirname, '../dist'),
    // 入口文件的输出路径
    filename: 'static/js/[name].[hash:10].js',
    // 给打包输出的其他文件命名
    // chunkFilename: "static/js/[name].[hash:10].chunk.js",
    // 图片，字体图标等使用type:asset处理的资源命名
    assetModuleFilename: 'static/media/[hash:10][ext][query]',
    // 清除上一次打包的内容
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            // 从右往左
            use: getStyleLoader(),
          },
          {
            test: /\.less$/i,
            use: getStyleLoader('less-loader'),
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 4kb
              },
            },
            // generator: {
            //     filename: 'static/images/[hash:10][ext][query]'
            // },
          },
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/i,
            type: 'asset/resource',
            // generator: {
            //     filename: 'static/media/[hash:10][ext][query]'
            // },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  // presets: ['@babel/preset-env'],
                  // 将babel编译时的辅助代码提取到单独的文件
                  plugins: ['@babel/plugin-transform-runtime'],
                  cacheDirectory: true,
                  cacheCompression: false,
                },
              },
              {
                // babel开启多线程打包
                loader: 'thread-loader',
                options: {
                  workers: threads,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        parallel: threads,
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: 'http://www.w3.org/2000/svg' },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    // splitChunks: {
    //     chunks: 'all',
    //     // 其他使用默认值
    // },
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`,
    },
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      cache: true,
      // eslint开启多线程打包
      threads,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      // chunkFilename: 'static/css/[name].chunk.css',
    }),
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  mode: 'production',
  devtool: 'source-map',
};
