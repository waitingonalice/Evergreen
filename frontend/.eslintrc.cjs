module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:@typescript-eslint/recommended", "prettier"],
  // overrides: [
  //   {
  //     files: ["*.ts", "*.tsx"], // Your TypeScript files extension

  //     // As mentioned in the comments, you should extend TypeScript plugins here,
  //     // instead of extending them outside the `overrides`.
  //     // If you don't want to extend any rules, you don't need an `extends` attribute.
  //     extends: [
  //       "plugin:@typescript-eslint/recommended",
  //       "plugin:@typescript-eslint/recommended-requiring-type-checking",
  //     ],

  //     parserOptions: {
  //       project: ["./tsconfig.json"], // Specify it only for TypeScript files
  //     },
  //   },
  // ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    jsx: true,
  },

  plugins: ["react", "@typescript-eslint"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    "no-console": "error",
    "no-unused-vars": "error",
  },
};
