import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    name: 'Files',
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    name: 'Ignore',
    ignores: ['**/dist/'],
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    name: 'Custom rules',
    rules: {
      'prettier/prettier': 'warn',

      'no-console': 'error',
    },
  },
];
