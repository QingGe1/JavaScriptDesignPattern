module.exports = {
    root: true,
    "env": {
        "browser": true,
        "es6": true
    },
    "plugins": ["prettier"],
    "extends": [
        "eslint:recommended",
        "prettier"
    ],
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
        'prefer-template': 'error',
        'no-var': 'error',
        "quotes": ['error', "single"],
        "indent": ['error', 2],//缩进风格
    }
};
