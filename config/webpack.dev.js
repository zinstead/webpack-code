const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  // 入口用相对路径
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/[name].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            // 从右往左
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: {
                    auto: true,
                  },
                },
              },
            ],
          },
          {
            test: /\.less$/i,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: {
                    auto: true,
                  },
                },
              },
              ,
              "less-loader",
            ],
          },
          {
            test: /\.(jpe?g|png|gif|webp|svg)$/i,
            type: "asset",
            generator: {
              filename: "static/images/[hash:10][ext][query]",
            },
          },
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/i,
            type: "asset/resource",
            generator: {
              filename: "static/media/[hash:10][ext][query]",
            },
          },
          {
            test: /\.(jsx?|tsx?)$/,
            exclude: /node_modules/,
            use: [
              "thread-loader",
              {
                loader: "babel-loader",
                options: {
                  plugins: ["react-refresh/babel"],
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
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      favicon: path.resolve(__dirname, "../public/nothing.svg"),
    }),
    new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({ async: false }),
  ],
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true, // history路由
    proxy: [
      {
        context: "/api",
        target: "http://httpbin.org/",
        changeOrigin: true,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "../src"), // 将 `@/` 映射到 `src` 目录
    },
  },
  mode: "development",
  devtool: "cheap-module-source-map",
  cache: {
    type: "filesystem",
  },
};
