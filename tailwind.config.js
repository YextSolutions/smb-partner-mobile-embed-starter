const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font, '')", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "primary-color": "var(--primary-color, 'black')",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
