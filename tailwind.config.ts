import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    fontFamily: {
      sans: [
        "Roboto Slab",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    extend: {
      colors: {
        "navy-blue": "#000080",
      },
      fontSize: {
        "3xl": "1.875rem",
        lg: "1.125rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
