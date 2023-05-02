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
  plugins: ["react", "@typescript-eslint", "import"],
  rules: {
    "prefer-arrow-callback": ["error"],
    "linebreak-style": ["error", "unix"],
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-console": "warn",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
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
    "import/newline-after-import": ["error", { count: 1 }],
    "no-return-assign": ["error", "except-parens"],
    "import/no-extraneous-dependencies": ["off"],
    "import/no-unresolved": "off",
    "react/function-component-definition": ["off"],
    "react/require-default-props": ["off"],
    "import/extensions": "off", // off because of tsconfig paths
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off",
    "no-shadow": "off",
  },
};
