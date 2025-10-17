module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        // corejs兼容js版本，在package.json的browerslist中指定
        corejs: 3,
      },
    ],
    [
      "@babel/preset-react",
      {
        // react17以后不需要显式导入react就能使用jsx
        runtime: "automatic",
      },
    ],
    "@babel/preset-typescript",
  ],
};
