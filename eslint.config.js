const globals = require('globals');

const pluginJs = require('@eslint/js');
const tseslint = require('typescript-eslint');
const pluginReact = require('eslint-plugin-react');
const pluginImport = require('eslint-plugin-import');
const pluginImportX = require('eslint-plugin-import-x');
const pluginStylistic = require('@stylistic/eslint-plugin');
const pluginJsxA11y = require('eslint-plugin-jsx-a11y');
const pluginReactHooks = require('eslint-plugin-react-hooks');
const pluginNext = require('@next/eslint-plugin-next');
const airbnbExtended = require('eslint-config-airbnb-extended');



module.exports = tseslint.config(
  {
    // Global ignores
    ignores: ['node_modules/', 'dist/', '.next/', 'out/', 'build/'],
  },
  {
    plugins: {
      react: pluginReact,
      import: pluginImport,
      'import-x': pluginImportX,
      '@stylistic': pluginStylistic,
      'jsx-a11y': pluginJsxA11y,
      'react-hooks': pluginReactHooks,
      '@next/next': pluginNext,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...airbnbExtended.configs.base.all,
  ...airbnbExtended.configs.react.all,
  ...airbnbExtended.configs.next.all,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      // Add or override rules here
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/prefer-default-export': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/require-default-props': 'off',
      'no-param-reassign': ['error', { props: false }],
      'no-underscore-dangle': 'off',
      '@stylistic/linebreak-style': 'off',
      'import-x/prefer-default-export': 'off',
      '@stylistic/max-len': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      'prefer-template': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
);