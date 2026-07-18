import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        papel: "#FFFFFF",
        carbon: "#241A14",
        tomate: "#CC3624",
        mandarina: "#F5871F",
        cereza: "#B92A1C",
        arena: "#8C7566",
        crema: "#F5E8DA",
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
