module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  plugins: ['react', 'prettier', '@typescript-eslint', 'react-hooks'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'airbnb-typescript',
  ],
  rules: {
    // eslint
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'arrow-parens': [2, 'as-needed'],
    'import/prefer-default-export': 0,

    // typescript
    '@typescript-eslint/semi': 0,

    // react
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'react/jsx-one-expression-per-line': 0,
  },
}
