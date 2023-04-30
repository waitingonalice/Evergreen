module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
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
  plugins: ["react", "@typescript-eslint", "import"],
  rules: {
    "prefer-arrow-callback": ["error"],
    "linebreak-style": ["error", "unix"],
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-console": "warn",
    "no-unused-vars": "error",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "arrow-body-style": ["error", "as-needed"],
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
  },
};
