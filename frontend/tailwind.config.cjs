/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        primary: "#0f766e", // teal-700
        "primary-2": "#0d9488", // teal-600
        secondary: "#065f46", // emerald-800
        tertiary: "#064e3b", // emerald-900
        "primary-dark": "#1f2937",
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
        background: "#e7e5e4",
        dark: "#1f2937", // gray-800
        disabled: "#d1d5db", // gray-300
      },
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
};
