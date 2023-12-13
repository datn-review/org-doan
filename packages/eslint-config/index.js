module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  parser: '@typescript-eslint/parser',

  // ignorePatterns: ["postcss.config.cjs", "tailwind.config.cjs"],
  // plugins: ['react', '@typescript-eslint', 'prettier'],

  rules: {
    'prettier/prettier': [
      'off',
      {
        endOfLine: 'auto',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'react/no-unescaped-entities': 'off',
    'react/no-unknown-property': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/consistent-type-assertions': [
      0,
      {
        assertionStyle: 'as | angle-bracket',
        objectLiteralTypeAssertions: 'allow | allow-as-parameter',
      },
    ],
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/unified-signatures': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/consistent-type-exports': 'error',
  },
  overrides: [
    {
      files: ['*.json'],
      processor: 'json',
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
};
