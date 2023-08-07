module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  env: { browser: true },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['import', 'jsx-a11y'],
  settings: {
    react: { version: 'detect' },

    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended', // Enforce import orders, prevent duplicates...
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // prettier issues shown in eslint output. Should be the last element of the extends array
  ],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'react/no-unescaped-entities': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/prop-types': 2, // force typing of components props.
    'jsx-a11y/no-autofocus': 0,
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index', 'object'],
          'type',
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
        ],
      },
    ],
  },
};
