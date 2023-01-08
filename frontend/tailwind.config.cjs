/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        layerOne: "#1A1D2D", //body
        layerTwo: "#202234", //background color; (cards, banners)
        layerThree: "#272A3F", //background color; (modals, dropdowns)
        important: "#DCDEF3", //important text
        standard: "#9396B2", //standard text
        borderColor: "#333653",
        secondaryButton: "#2F3657",
        secondaryButtonHover: "#39426A",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
