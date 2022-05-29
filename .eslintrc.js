const {
  configs: { recommended: jestRecommendedConfig },
} = require('eslint-plugin-jest');

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:storybook/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['react'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    node: true,
    es6: true,
  },
  overrides: [
    {
      files: ['**/{src,pages,components}/**'],
      parserOptions: {
        sourceType: 'module',
      },
      env: {
        browser: true,
      },
    },
    {
      files: ['**/*.test.{js,jsx}', '**/__mocks__/**'],
      ...jestRecommendedConfig,
      env: {
        jest: true,
      },
    },
  ],
};
