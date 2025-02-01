import { FlatCompat } from '@eslint/eslintrc';
import jsonFormat from 'eslint-plugin-json-format';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'json-format': jsonFormat,
      'unused-imports': unusedImports,
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': [
        'error',
        {
          'arrays': 'always-multiline',
          'objects': 'always-multiline',
          'imports': 'always-multiline',
          'exports': 'always-multiline',
        },
      ],
      'space-before-function-paren': ['error', 'always'],
      'space-before-blocks': ['error', 'always'],
      'keyword-spacing': ['error'],
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error'],
      'comma-spacing': ['error'],
      'space-infix-ops': ['error'],
      'indent': ['error', 2],
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'unused-imports/no-unused-imports': 'error',
      'template-curly-spacing': 'off',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          'groups': [
            ['^react', '^next', '^@?\\w'],
            ['^(@|components)(/.*|$)'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.?(css)$'],
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
