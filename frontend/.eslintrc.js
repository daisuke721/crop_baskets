module.exports = {
  root: true,
  // 必要に応じて無視するパターンを指定
  ignorePatterns: ['node_modules', '.next'],
  extends: ['next', 'prettier'],
  // JS/JSX のみ使うなら parserOptions で ecmaVersion, sourceType を指定
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'warn',
    // Next.js では React import が不要なので無効化
    'react/react-in-jsx-scope': 'off',
  },
};
