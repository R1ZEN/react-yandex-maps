const {
  configs: { recommended: jestRecommendedConfig },
} = require('eslint-plugin-jest');

module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['react', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    node: true,
    es6: true,
  },
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/recommended',
      ],
      files: ['**/src/**'],
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
