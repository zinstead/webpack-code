const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

function getStyleLoader(preLoader) {
  return [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        modules: {
          // 文件名包含.module，启用css-module
          auto: true,
        },
      },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [["postcss-preset-env"]],
        },
      },
    },
    preLoader,
  ].filter(Boolean);
}

module.exports = {
  // 入口用相对路径
  entry: "./src/index.js",
  // 输出用绝对路径
  output: {
    path: path.resolve(__dirname, "../dist"),
    // 入口文件的输出路径
    filename: "static/js/[name].[hash:10].js",
    publicPath: "/",
    // 给打包输出的其他文件命名
    chunkFilename: "static/js/[name].[hash:10].chunk.js",
    // 图片，字体图标等使用type:asset处理的资源命名
    assetModuleFilename: "static/media/[hash:10][ext][query]",
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
            use: getStyleLoader("less-loader"),
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            type: "asset",
          },
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/i,
            type: "asset/resource",
          },
          {
            test: /\.(jsx?|tsx)$/,
            exclude: /node_modules/,
            use: [
              "thread-loader",
              {
                loader: "babel-loader",
                options: {
                  // 将babel编译时的辅助代码提取到单独的文件
                  plugins: ["@babel/plugin-transform-runtime"],
                  cacheDirectory: true,
                  cacheCompression: false,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.css",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "../src"), // 将 `@/` 映射到 `src` 目录
    },
  },
  mode: "production",
  devtool: "source-map",
};
