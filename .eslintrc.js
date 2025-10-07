// module.exports = {
//   parser: '@typescript-eslint/parser', // 使用 TypeScript 解析器
//   plugins: ['react', 'react-hooks', '@typescript-eslint'],
//   extends: [
//     'eslint:recommended', // ESLint 官方推荐规则
//     'plugin:react/recommended', // React 推荐规则
//     'plugin:react-hooks/recommended', // React Hooks 推荐规则
//     'plugin:@typescript-eslint/recommended', // TypeScript 推荐规则
//   ],
//   rules: {
//     'react/react-in-jsx-scope': 'off', // 关闭 JSX 需要手动引入 React 的规则
//     'react/prop-types': 'off', // TypeScript 已经有类型检查
//   },
// };

module.exports = {
  extends: ["react-app"],
};
