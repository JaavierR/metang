const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme, addUtilities }) {
      matchUtilities(
        {
          highlight: (value) => ({
            boxShadow: `inset 0 1px 0 0 ${value}`,
          }),
        },
        {
          values: flattenColorPalette(theme("backgroundColor")),
          type: "color",
        }
      );
      addUtilities({
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
      });
    }),
  ],
};
