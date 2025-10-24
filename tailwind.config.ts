import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: [
        "Fira Sans",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      mono: [
        "Fira Code",
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
    extend: {
      colors: {
        "navy-blue": "#1e3a8a",
        "grinch-green": "#00a353",
        "light-grey": "#f5f5f5",
      },
      fontSize: {
        "3xl": "1.875rem",
        lg: "1.125rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
