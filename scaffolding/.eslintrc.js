module.exports = {
  'parser': 'babel-eslint',
  'extends': 'airbnb',
  'env': {
    'browser': true,
    // https://github.com/eslint/eslint/issues/1827
    // using the node environment disables no-console
    'node': true,
  },
  'rules': {
    'semi': [2, 'never'],
    'indent': ['error', 2, {'SwitchCase': 1}],
    'strict': [0],
    'no-shadow': 'off',
    'arrow-parens': [2, 'always'],
    'no-unused-expressions': [2, {'allowShortCircuit': true, 'allowTernary': true}],
    'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx'] }],
    'react/self-closing-comp': [2, { 'component': true, 'html': false }],
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
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/href-no-hash': 0,
    'class-methods-use-this': 0,
    'import/no-unresolved': [2, { 'ignore': ['(css|js|img)'] }],
    'import/extensions': [2, { 'js': 'never' }],
    'import/no-extraneous-dependencies': 0,
    // reference https://medium.com/@paulwithap/the-most-important-eslint-rule-for-redux-applications-c10f6aeff61d
    'import/named': 2,
    'no-console': ['error', { 'allow': ['error'] }],
    // https://github.com/benmosher/eslint-plugin-import/issues/520
    'import/imports-first': [ 'warn', 'DISABLE-absolute-first' ],
  },
  'globals': {
    'React': false,
    'ReactDOM': false,
    '$': false,
    'fecha': false,
    '_': false,
    'echarts': false,
    'reqwest': false,
    'wx': false,
    'WebViewJavascriptBridge': false,
    'fixScroll': false,
    'setCachedHTML': false,
    'ga': false,
    'Gon': false,
    'Slider': false,
    'window': false,
    'document': false,
  }
}
