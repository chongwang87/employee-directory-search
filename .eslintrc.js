module.exports = {
    "globals": { // Define custom global variable

    },
    "env": {
        "amd": true,
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "array-bracket-spacing": ["error", "never"],
        "array-bracket-newline": ["error", "consistent"],
        "array-element-newline": ["error", "consistent"],
        "arrow-spacing": "error",
        "block-spacing": "error",
        "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
        "camelcase": ["error", { properties: 'never' }],
        "comma-dangle": ["error", "never"],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "comma-style": ["error", "last"],
        "computed-property-spacing": ["error", "always"],
        "curly": "error",
        "func-call-spacing": ["error", "never"],
        "indent": ["error", "tab", {
            "ArrayExpression": 1,
            "CallExpression": { "arguments": 1 },
            "flatTernaryExpressions": false,
            "FunctionDeclaration": { "body": 1, "parameters": 1 },
            ImportDeclaration: 1,
            "MemberExpression": 1,
            "ObjectExpression": 1,
            "outerIIFEBody": 0,
            "SwitchCase": 1,
            "VariableDeclarator": 1
        }],
        "key-spacing": ["error", { "afterColon": true, "beforeColon": true }],
        "keyword-spacing": ["error", { "after": true, "before": true }],
        "line-comment-position": ["error", { "position": "above" }],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-array-constructor": "error",
        'new-cap': "error",
        "no-cond-assign": "error",
        "no-extra-bind": "error",
        "no-irregular-whitespace": "error",
        "no-new-object": "error",
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "no-multiple-empty-lines": ["error", { "max": 1 }],
        "no-multi-spaces": "error",
        "no-unexpected-multiline": "error",
        "no-unneeded-ternary": "error",
        "no-trailing-spaces": "error",
        "no-var": "error",
        "no-unused-vars": ["error", {
            "args": "none"
        }],
        "object-curly-newline": ["error", {
            "ObjectExpression": { "minProperties": 2 },
            "ObjectPattern": { "minProperties": 2 },
            "ImportDeclaration": "never",
            "ExportDeclaration": "never"
        }],
        "object-curly-spacing": ["error", "always"],

        "one-var": ["error", "consecutive"],
        "padded-blocks": ["error", "never"],
        "padding-line-between-statements": [
            "error",
            { blankLine: "always", prev: ["import", "const", "let", "var"], next: "*" },
            { blankLine: "any", prev: ["import", "const", "let", "var"], next: ["import", "const", "let", "var"] }
        ],
        "switch-colon-spacing": ["error", { "after": true, "before": false }],
        "quotes": [
            "error",
            "single"
        ],
        "quote-props": ["error", "as-needed"],
        "react/jsx-uses-vars": [2],
        "react/prop-types": 0,
        "react/react-in-jsx-scope": "off",
        "rest-spread-spacing": ["error", "never"],
        "semi": ["error", "never", { "beforeStatementContinuationChars": "always" }],
        "space-before-blocks": "error",
        'space-before-function-paren': ["error", {
            asyncArrow: 'always',
            anonymous: 'never',
            named: 'never',
        }],
        "spaced-comment": ["error", "always"],
        "space-in-parens": ["error", "never"],
        "template-curly-spacing": ["error", "always"],
        "template-tag-spacing": ["error", "always"]
    }
};
