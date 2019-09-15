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
    rules: {
        'semi': ["error", 'always'],
        'no-else-return': "error",
        'eqeqeq': ["error", 'smart'],
        'block-scoped-var': "error",
        'no-multi-spaces': "error",
        'indent': ["error", 4],
        'space-infix-ops': "error",
        'key-spacing': "error",
        'keyword-spacing': "error",
        'no-array-constructor': "error",
        'no-new-object': "error",
        'no-tabs': "error",
        'brace-style': ["error", '1tbs'],
        'comma-spacing': "error",
        'space-before-blocks': "error",
        'no-trailing-spaces': "error",
        'no-redeclare': "error",
        'no-use-before-define': "error",
        'no-duplicate-imports': "error",
        'no-unreachable': "error",
        'no-sparse-arrays': "error",
        'curly': "warn",
        'no-undefined': "warn",

        // allow paren-less arrow functions
        'arrow-parens': "off",
        // allow async-await
        'generator-star-spacing': "off",
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? "error" : 0
    }
};