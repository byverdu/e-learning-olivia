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
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb-typescript',
  ],
  rules: {
    // eslint
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'arrow-parens': [2, 'as-needed'],
    'import/prefer-default-export': 0,
    'quotes': [1, 'single'],

    // typescript
    '@typescript-eslint/semi': 0,

    // react
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'react/prop-types': 0,
    'react/jsx-max-props-per-line': [2, { "maximum": 1 }],
    "react/static-property-placement": ["warn", "property assignment", {
      childContextTypes: "static getter",
      contextType: "static public field",
      displayName: "static public field",
    }]
  },
}
