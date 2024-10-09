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
        background: "var(--background)",
        foreground: "var(--foreground)",
        white : "var(--white)",
      },
      fontSize: {
        large:"26px",
        medium: "24px",
        small: "16px"
      },
      fontFamily: 
      {
        comic : "var(--comic)" 
      }
    },
  },
  plugins: [],
};
export default config;
