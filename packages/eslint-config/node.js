module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "@remix-run/eslint-config",
    "prettier",
    "plugin:prettier/recommended",
  ],
  rules: {
    camelcase: "error",
    "use-isnan": "error",
    "no-unreachable": "error",
    "import/no-unresolved": "off",
    "newline-before-return": "error",
    "no-useless-computed-key": "error",
    eqeqeq: [
      "error",
      "always",
      {
        null: "ignore",
      },
    ],
    "one-var": [
      "error",
      {
        initialized: "never",
      },
    ],
    "prefer-destructuring": [
      "error",
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
      {
        blankLine: "always",
        prev: "multiline-block-like",
        next: "if",
      },
      {
        blankLine: "always",
        prev: "multiline-block-like",
        next: "expression",
      },
      {
        blankLine: "always",
        prev: "const",
        next: "if",
      },
    ],
  },
}

