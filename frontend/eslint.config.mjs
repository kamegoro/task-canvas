import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';
import nextConfig from 'eslint-config-next';
import prettierPlugin from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: [
      'storybook-static/**',
      '.storybook/**',
      'eslint.config.mjs',
      'next.config.js',
    ],
  },
  ...nextConfig,
  // nextConfig already registers @typescript-eslint plugin; only add the rules
  ...tsPlugin.configs['flat/recommended'].filter((c) => !c.plugins),
  {
    settings: {
      react: {
        version: '19',
      },
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
      'unused-imports': unusedImports,
      import: importPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          pathGroups: [
            {
              pattern: '{react,react/**,react-dom/**}',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '{next,next/**}',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '{@mui/**,@emotion/**}',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '{@/**}',
              group: 'parent',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always-and-inside-groups',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  // eslint-plugin-import@2.32.0 crashes on ESLint 10 when import/order detects
  // violations in test files that use vi.mock() hoisting patterns.
  // Disable import/order for test files until eslint-plugin-import adds ESLint 10 support.
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      'import/order': 'off',
    },
  },
];
