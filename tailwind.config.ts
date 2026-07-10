import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EEF2E8",
        ink: "#1F3A2E",
        forest: "#16281F",
        gold: "#E3A23C",
        clay: "#C97B63",
        moss: "#7C9473",
        moss50: "#EAF0E6",
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
