import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: "#faf6f1",
          100: "#f3ebe0",
          200: "#e6d5c1",
          300: "#d4b89a",
          400: "#bf9872",
          500: "#a67c55",
          600: "#8a6342",
          700: "#6b4d35",
          800: "#503a2b",
          900: "#3d2c1e",
          950: "#231a12",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderWidth: {
        "3": "3px",
      },
      boxShadow: {
        "warm-sm": "0 1px 3px rgba(61, 44, 30, 0.06)",
        "warm-md": "0 4px 12px rgba(61, 44, 30, 0.08)",
        "warm-lg": "0 12px 36px rgba(61, 44, 30, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
