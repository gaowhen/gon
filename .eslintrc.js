module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    // https://github.com/eslint/eslint/issues/1827
    // using the node environment disables no-console
    'node': true,
  },
  rules: {
    'semi': [2, 'never'],
    'indent': ['error', 2, {'SwitchCase': 1}],
    'strict': [0],
    'no-shadow': 'off',
    'arrow-parens': [2, 'always'],
    'no-unused-expressions': [2, {'allowShortCircuit': true, 'allowTernary': true}],
    'no-mixed-operators': [
      2,
      {
        'groups': [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof']
        ],
        'allowSamePrecedence': true
      }
    ],
    'no-plusplus': [2, { 'allowForLoopAfterthoughts': true }],
    'class-methods-use-this': 0,
    'import/no-extraneous-dependencies': 0,
    // reference https://medium.com/@paulwithap/the-most-important-eslint-rule-for-redux-applications-c10f6aeff61d
    'import/named': 2,
    'no-console': ['error', { 'allow': ['log', 'error'] }],
  },
  'globals': {
    'window': false,
    'document': false,
    'exec': false,
    'cp': false,
  }
}
