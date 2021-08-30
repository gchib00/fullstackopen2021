module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'jest': true
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module',
    'allowImportExportEverywhere': true,
    'ecmaVersion': 12
  },
  'extends': 'eslint:recommended',
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
