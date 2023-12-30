const baseConfig = require("@waitingonalice/design-system/tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    fontFamily: { sans: ["Inter"] },
  },
  content: [
    "./index.html",
    "./src/**/*.{jsx,tsx}",
    "../node_modules/@waitingonalice/design-system/**/*.{cjs,js}",
  ],
};
