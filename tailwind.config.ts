import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
     colors: {
  paper: "#FFF8F1",
  ink: "#2B2B2B",

  primary: "#F97316",
  primaryDark: "#EA580C",

  secondary: "#EF4444",

  accent: "#FACC15",

  success: "#22C55E",

  info: "#3B82F6",

  surface: "#FFFFFF",

  border: "#E5E7EB",
},
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-worksans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
