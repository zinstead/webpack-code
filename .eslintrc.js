module.exports = {
  //继承eslint官方规则
  extends: ["eslint:recommended"],
  // 启用es6，node和浏览器的全局变量
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  // 使用es6语法，es模块化规范
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  // 自定义语法规则
  // rules: {
  //     "no-var": 2,
  // },
  // plugins: ["import"]
};
