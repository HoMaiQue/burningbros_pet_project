/* eslint-disable @typescript-eslint/no-var-requires */
// const path = require('path')
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // 'plugin:import/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'prettier'
  ],
  plugins: ['prettier'],
  settings: {
    react: {
      version: 'detect'
    }
    // 'import/resolver': {
    //   node: {
    //     paths: [path.resolve(__dirname, '')],
    //     extensions: ['.js', '.jsx', '.ts', '.tsx']
    //   }
    // }
  },
  env: {
    node: true
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-target-blank': 'warn',
    'react/prop-types': 'off',
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
  }
}
