import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'gradient-radial': "radial-gradient(ellipse at center,hsl(260deg 78% 35% / 40%),transparent 60%)"
      },
      zIndex: {
        "1": "1"
      },
      spacing: {
        '600': '150rem',
        '350': '87.5rem',
      }
    },
  },
  plugins: [],
} satisfies Config;
