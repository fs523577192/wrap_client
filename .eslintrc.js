// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    // extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        'semi': [2, 'always'],
        'no-else-return': 2,
        'eqeqeq': [2, 'smart'],
        'block-scoped-var': 2,
        'no-multi-spaces': 2,
        'indent': [2, 4],
        'space-infix-ops': 2,
        'key-spacing': 2,
        'keyword-spacing': 2,
        'no-array-constructor': 2,
        'no-new-object': 2,
        'no-tabs': 2,
        'brace-style': [2, '1tbs'],
        'comma-spacing': 2,
        'space-before-blocks': 2,
        'no-trailing-spaces': 2,
        'no-redeclare': 2,
        'no-use-before-define': 2,
        'no-duplicate-imports': 2,
        'no-unreachable': 2,
        'no-sparse-arrays': 2,
        'curly': 1,
        'no-undefined': 1,

        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
};