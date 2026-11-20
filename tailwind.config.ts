import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#172B3A",
          slate: "#263D4A",
          gold: "#B69A67",
          "gold-hover": "#A58957",
          "gold-light": "#F7F4EE",
          ivory: "#F4F3EF",
          "ivory-dark": "#ECEAE3",
          charcoal: "#20282D",
          muted: "#7B858B",
          border: "#E7E8E6",
          success: "#287A58",
          warning: "#C58A35",
          error: "#B94A48",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        heading: ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
      boxShadow: {
        architectural: "0 10px 30px -10px rgba(23, 43, 58, 0.08)",
        "architectural-lg": "0 20px 40px -15px rgba(23, 43, 58, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
