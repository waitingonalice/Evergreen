/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  rules: {
    "no-console": "warn",
    "no-empty": "error",
    "no-unused-expressions": "error",
    "no-unused-vars": "error",
    "no-unreachable": "error",
  },
};
