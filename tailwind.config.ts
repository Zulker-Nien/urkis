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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand) / <alpha-value>)",
          light: "hsl(var(--brand-light) / <alpha-value>)",
          dark: "hsl(var(--brand-dark) / <alpha-value>)",
        },
        zinc: {
          400: "rgb(var(--ui-muted-4) / <alpha-value>)",
          500: "rgb(var(--ui-muted-2) / <alpha-value>)",
          600: "rgb(var(--ui-muted-3) / <alpha-value>)",
          900: "rgb(var(--ui-card) / <alpha-value>)",
          950: "rgb(var(--ui-page) / <alpha-value>)",
        },
        slate: {
          100: "rgb(var(--ui-fg) / <alpha-value>)",
          200: "rgb(var(--ui-fg-2) / <alpha-value>)",
          300: "rgb(var(--ui-fg-3) / <alpha-value>)",
          400: "rgb(var(--ui-muted) / <alpha-value>)",
          500: "rgb(var(--ui-muted-2) / <alpha-value>)",
          600: "rgb(var(--ui-muted-3) / <alpha-value>)",
          800: "rgb(var(--ui-card) / <alpha-value>)",
          900: "rgb(var(--ui-card) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderColor: {
        white: "rgb(var(--ui-border) / <alpha-value>)",
      },
      backgroundColor: {
        black: "rgb(var(--ui-wash) / <alpha-value>)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
