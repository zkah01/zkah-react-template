module.exports = {
  // extends: ['plugin:react/recommended', 'prettier'],
  extends: ['react-app', 'react-app/jest'],
  parserOptions: {
    // ecmaVersion: 2020,
    // sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'error',
    'jsx-a11y/anchor-is-valid': 'off',
  },
};
