// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import react_hooks from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier, {
  plugins: {
    react,
    react_hooks,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // "prettier/prettier": ["error"],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': ['error'],
    'react_hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react_hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
  languageOptions: {
    sourceType: 'module',
    globals: {
      ...globals.browser,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  ignores: ['src/web_assembly/pkg/**/*'],
});
