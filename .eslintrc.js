module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "globlas":{
        "gtag":"readonly"
    },
    "rules": {
        "no-cond-assign": [
            "error",
            "always"
        ],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "no-unused-vars": "off",
        "semi": [
            "error",
            "always"
        ]
    }
};
