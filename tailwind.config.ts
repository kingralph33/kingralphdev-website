import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "navy-blue": "#000080",
      },
      fontFamily: {
        sans: ['"Roboto Slab"', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
