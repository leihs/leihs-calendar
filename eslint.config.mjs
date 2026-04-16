import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import babelParser from '@babel/eslint-parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parser: babelParser,
      parserOptions: { requireConfigFile: false, babelOptions: { presets: ['@babel/preset-react'] } },
    },
  },
  pluginJs.configs.recommended,
  { ...pluginReactConfig, settings: { react: { version: 'detect' } } },
  prettierConfig,
  {
    plugins: { prettier: prettierPlugin },
    rules: { 'prettier/prettier': 'warn' },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    languageOptions: { globals: globals.jest },
  },
];
