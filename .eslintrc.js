module.exports = {
  env: {
    browser: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    es6: true
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'], // linux
    // 'linebreak-style': ['error', 'windows'], // windows
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': 'off',
    'no-alert': 'off'
  },
  globals: {
    window: true,
    document: true,
    location: true,
    fetch: true,
    console: true
  }
};
