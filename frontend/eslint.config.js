// @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import tseslint from 'typescript-eslint'

export default [
  ...tanstackConfig,
  ...tseslint.configs.recommendedTypeChecked, // 👈 ensures type-aware linting
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'], // 👈 adjust path if your tsconfig is elsewhere
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      parserOptions: {
        project: null, // 👈 don’t require type-checking for config JS files
      },
    },
  },
  {
    ignores: [
      'eslint.config.js',
      'prettier.config.js',
      'vite.config.*',
      'tailwind.config.*',
    ],
  },
]
