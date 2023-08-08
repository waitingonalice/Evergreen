/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Manrope"],
    },
    extend: {
      colors: {
        primary: "#047857", // emerald-700
        secondary: "#065f46", // emerald-800
        tertiary: "#064e3b", // emerald-900
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
        important: "#fffbeb", // amber-50
        standard: "#e5e5e5", // gray-200
        dark: "#111827", // gray-900
        disabled: "#d1d5db", // gray-300
      },
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require("@tailwindcss/forms")],
};
