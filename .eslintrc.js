module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import', 'prettier'],
  rules: {
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'no-mixed-spaces-and-tabs': 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    semi: ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
