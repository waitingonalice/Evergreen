/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter"],
    },
    extend: {
      colors: {
        primary: "#047857", // emerald-700
        "primary-2": "#059669",
        secondary: "#065f46", // emerald-800
        tertiary: "#064e3b", // emerald-900
        "primary-dark": "#01241A",
        errorMain: "#dc2626", // red-600
        errorSecondary: "#b91c1c", // red-700
        errorTertiary: "#991b1b", // red 800
        errorLight: "#ffd9d9",
        successMain: "#d9ffdd",
        successSecondary: "#41cc4f",
        successTertiary: "#00750c",
        warningMain: "#fff5cc",
        warningSecondary: "#ffcf0d",
        warningTertiary: "#997b00",
        important: "#efedea",
        dark: "#1f2937", // gray-800
        disabled: "#d1d5db", // gray-300
      },
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require("@tailwindcss/forms")],
};
