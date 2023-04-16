module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    jsx: true,
  },
  settings: {
    react: {
      version: "18.2.0",
    },
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "prefer-arrow-callback": ["error"],
    "linebreak-style": ["error", "unix"],
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-console": "warn",
    "import/no-unresolved": ["off"], // turn this off as it does not support path aliases
    "import/extensions": ["off"],
    "no-shadow": "off",
    "react/require-default-props": ["off"],
    "react/button-has-type": ["off"],
    "react/jsx-props-no-spreading": ["off"],
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react/function-component-definition": ["off"],
    "react-hooks/exhaustive-deps": "off",
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
  },
};
