/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["roboto", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#065f46", // emerald-800
        secondary: "#34d399", // emerald-400
        tertiary: "#22c55e", // green-500
        important: "#fffbeb", // amber-50
        standard: "#e5e5e5", // gray-200
        dark: "#2F3657",
      },
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require("@tailwindcss/forms")],
};
