/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      gray: "#707070",
      gray_light: "#999999",
      dark_gray: "#404040",
    },
    extend: {
      animation: {
        fly_to_cart: "fly 1s ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
});
