// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'airbnb'],
  plugins: ['@typescript-eslint', 'react'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['/dist/*'],
  rules: {
    'react/function-component-definition': ['error', {
      namedComponents: ['function-declaration', 'arrow-function'],
      unnamedComponents: 'arrow-function',
    }],
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': [1, {
      extensions: [
        '.jsx',
        '.tsx',
      ],
    }],
  },
};
