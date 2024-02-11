module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "standard",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
        ecmaVersion: 9,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    bar: "baz",
    qux: "quux",
    semi: ["error", "always"],
    quotes: ["error", "double"],
    // "no-unused-vars": "warn",
  },
};
