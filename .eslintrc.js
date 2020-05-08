module.exports = {
    root: true,
    "env": {
        "browser": true,
        "es6": true
    },
    "plugins": ["prettier"],
    // "extends": ["eslint:recommended", "prettier"],
    "extends": ["plugin:prettier/recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "impliedStrict": true, // 启用全局 strict mode
        }
    },
    "rules": {
        "prettier/prettier": "error",
        "prettier/prettier": [
            "error",
            {
                singleQuote: true,
            }
        ],
        // 'prefer-template': 'error',
        'no-var': 'error',
        // "indent": ['error', 2],//缩进风格
    }
};
