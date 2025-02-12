import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary": "#31465e",
        "secondary": "#233243",
        "terciary": "#e0e0e0",
        "button": "#2a3c50",
        "success": "#94c25b",
        "error": "#a3293f",
        "color-text": "#E8E6D4"
      },
    },
  },
  plugins: [],
} satisfies Config;
