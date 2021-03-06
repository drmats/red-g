/**
 * ESLint config.
 *
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 * @author drmats
 */

"use strict"




// ...
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
    },

    "extends": [
        "eslint:recommended",
    ],

    "parser": "@babel/eslint-parser",

    "plugins": [
        "import",
    ],

    "root": true,

    "rules": {
        "comma-dangle": [
            "error",
            {
                "arrays": "always-multiline",
                "exports": "always-multiline",
                "functions": "always-multiline",
                "imports": "always-multiline",
                "objects": "always-multiline",
            },
        ],
        "indent": ["warn", 4, { "SwitchCase": 1 }],
        "linebreak-style": ["error", "unix"],
        "no-console": "warn",
        "no-dupe-args": "error",
        "no-dupe-class-members": "error",
        "no-dupe-keys": "error",
        "no-redeclare": "error",
        "no-undef": "error",
        "no-unexpected-multiline": "error",
        "no-unused-vars": ["warn", { "args": "all", "argsIgnorePattern": "^_" }],
        "object-curly-newline": "off",
        "object-curly-spacing": ["error", "always"],
        "quotes": ["error", "double"],
        "semi": ["error", "never"],
        "space-before-function-paren": ["error", "always"],
        "strict": "off",

        "import/first": "error",
        "import/no-amd": "error",
        "import/no-webpack-loader-syntax": "error",
    },

    "overrides": [
        {
            "files": ["*.ts"],
            "parser": "@typescript-eslint/parser",
            "extends": [
                "eslint:recommended",
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended",
            ],
            "plugins": [
                "@typescript-eslint",
            ],
            "rules": {
                "@typescript-eslint/comma-dangle": [
                    "error",
                    {
                        "arrays": "always-multiline",
                        "enums": "always-multiline",
                        "exports": "always-multiline",
                        "functions": "always-multiline",
                        "generics": "always-multiline",
                        "imports": "always-multiline",
                        "objects": "always-multiline",
                        "tuples": "always-multiline",
                    },
                ],
                "@typescript-eslint/indent": "off",
                "@typescript-eslint/interface-name-prefix": "off",
                "@typescript-eslint/no-unused-vars": ["warn", { "args": "all", "argsIgnorePattern": "^_" }],
                "@typescript-eslint/semi": ["error", "always"],
                "comma-dangle": "off",
                "indent": ["warn", 4, { "SwitchCase": 1 }],
                "prefer-const": "off",
                "semi": "off",
            },
        },
    ],
}
